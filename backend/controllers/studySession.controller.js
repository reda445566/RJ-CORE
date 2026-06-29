import asyncHandler from 'express-async-handler';
import StudySession from '../models/studySession.model.js';
import Points from '../models/points.model.js';
import { v4 as uuidv4 } from 'uuid';

// إنشاء Room جديدة
export const createRoom = asyncHandler(async (req, res) => {
  const { topic, maxMembers, isPrivate } = req.body;
  const roomId = uuidv4();
  const session = await StudySession.create({
    roomId,
    host: req.user._id,
    topic,
    maxMembers: maxMembers || 5,
    isPrivate: isPrivate || false,
    participants: [req.user._id],
  });
  
  res.status(201).json({
    success: true,
    data: session,
  });
});

// كل الـ Rooms المتاحة
export const getRooms = asyncHandler(async (req, res) => {
  const rooms = await StudySession.find({
    status: { $in: ['waiting', 'active'] },
    isPrivate: false,
  })
    .populate('host', 'name avatar')
    .populate('participants', 'name avatar')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: rooms,
  });
});

// تفاصيل Room معينة
export const getRoomById = asyncHandler(async (req, res) => {
  const session = await StudySession.findOne({
    roomId: req.params.roomId,
  })
    .populate('host', 'name avatar')
    .populate('participants', 'name avatar');

  if (!session) {
    res.status(404);
    throw new Error('Room not found');
  }

  res.json({
    success: true,
    data: session,
  });
});

// الانضمام إلى Room
export const joinRoom = asyncHandler(async (req, res) => {
  const session = await StudySession.findOne({
    roomId: req.params.roomId,
  });

  if (!session) {
    res.status(404);
    throw new Error('Room not found');
  }

  if (session.status === 'ended') {
    res.status(400);
    throw new Error('Room already ended');
  }

  if (session.participants.length >= session.maxMembers) {
    res.status(400);
    throw new Error('Room is full');
  }

  const alreadyJoined = session.participants.some(
    (p) => p.toString() === req.user._id.toString()
  );

  if (alreadyJoined) {
    res.status(400);
    throw new Error('Already in room');
  }

  session.participants.push(req.user._id);

  if (session.status === 'waiting') {
    session.status = 'active';
    session.startedAt = new Date();
  }

  await session.save();

  res.json({
    success: true,
    data: session,
  });
});

// إنهاء الـ Session وإضافة النقاط
export const endRoom = asyncHandler(async (req, res) => {
  const session = await StudySession.findOne({
    roomId: req.params.roomId,
  });

  if (!session) {
    res.status(404);
    throw new Error('Room not found');
  }

  if (session.host.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Only host can end the room');
  }

  const endedAt = new Date();

  const duration = session.startedAt
    ? Math.round((endedAt - session.startedAt) / 60000)
    : 0;

  session.status = 'ended';
  session.endedAt = endedAt;
  session.duration = duration;

  await session.save();

  const pointsToAdd = Math.min(duration, 60);

  for (const userId of session.participants) {
    let userPoints = await Points.findOne({
      user: userId,
    });

    if (!userPoints) {
      userPoints = await Points.create({
        user: userId,
      });
    }

    await userPoints.addPoints(
      pointsToAdd,
      'study_session'
    );
  }

  res.json({
    success: true,
    data: session,
    pointsAwarded: pointsToAdd,
  });
});

// مغادرة الـ Room
export const leaveRoom = asyncHandler(async (req, res) => {
  const session = await StudySession.findOne({
    roomId: req.params.roomId,
  });

  if (!session) {
    res.status(404);
    throw new Error('Room not found');
  }

  session.participants = session.participants.filter(
    (p) => p.toString() !== req.user._id.toString()
  );

  if (session.host.toString() === req.user._id.toString()) {
    if (session.participants.length > 0) {
      session.host = session.participants[0];
    } else {
      session.status = 'ended';
      session.endedAt = new Date();
    }
  }

  await session.save();

  res.json({
    success: true,
    data: session,
  });
});

