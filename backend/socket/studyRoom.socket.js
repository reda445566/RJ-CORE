const jwt = require('jsonwebtoken');
const StudySession = require('../models/studySession.model');
const User = require('../models/user.model');

module.exports = function initStudyRoomSocket(io) {

  // middleware للتأكد من الـ auth قبل ما الكونكشن يكمل
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication required'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return next(new Error('User not found'));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🟢 User connected: ${socket.user.name} (${socket.id})`);

    // الانضمام لـ room
    socket.on('join_room', async ({ roomId }) => {
      try {
        const session = await StudySession.findOne({ roomId });
        if (!session) return socket.emit('error', { message: 'Room not found' });

        socket.join(roomId);
        socket.currentRoom = roomId;

        // إبلاغ الباقيين إن حد دخل
        socket.to(roomId).emit('user_joined', {
          user: { id: socket.user._id, name: socket.user.name, avatar: socket.user.avatar },
        });

        // ابعت قائمة المتصلين الحاليين للداخل الجديد
        const room = io.sockets.adapter.rooms.get(roomId);
        socket.emit('room_joined', { roomId, memberCount: room?.size || 1 });
      } catch (err) {
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // رسائل الشات جوا الـ room
    socket.on('send_message', ({ roomId, message }) => {
      if (!socket.currentRoom || socket.currentRoom !== roomId) return;

      io.to(roomId).emit('new_message', {
        user:      { id: socket.user._id, name: socket.user.name, avatar: socket.user.avatar },
        message,
        timestamp: new Date(),
      });
    });

    // تحديث حالة المذاكرة (مثلاً: focus / break)
    socket.on('status_update', ({ roomId, status }) => {
      if (!socket.currentRoom || socket.currentRoom !== roomId) return;

      socket.to(roomId).emit('member_status', {
        userId: socket.user._id,
        status, // 'studying' | 'break' | 'away'
      });
    });

    // مؤقت المذاكرة (Pomodoro مثلاً) — الـ host بس يتحكم فيه
    socket.on('timer_control', async ({ roomId, action }) => {
      const session = await StudySession.findOne({ roomId });
      if (!session || session.host.toString() !== socket.user._id.toString()) return;

      io.to(roomId).emit('timer_update', { action, triggeredBy: socket.user.name });
      // action: 'start' | 'pause' | 'reset'
    });

    // مغادرة الـ room (بدون قطع الاتصال بالكامل)
    socket.on('leave_room', ({ roomId }) => {
      socket.leave(roomId);
      socket.to(roomId).emit('user_left', { userId: socket.user._id });
      socket.currentRoom = null;
    });

    // قطع الاتصال
    socket.on('disconnect', () => {
      if (socket.currentRoom) {
        socket.to(socket.currentRoom).emit('user_left', { userId: socket.user._id });
      }
      console.log(`🔴 User disconnected: ${socket.user.name}`);
    });
  });
};