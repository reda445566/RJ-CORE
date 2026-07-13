const express = require('express');
const router = express.Router();

const studySessionController = require('../controllers/studySession.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/',                          authenticate, studySessionController.createRoom);
router.get('/',                           authenticate, studySessionController.getRooms);
router.get('/:roomId',                    authenticate, studySessionController.getRoomById);
router.get('/:roomId/pending',            authenticate, studySessionController.getPendingRequests);
router.post('/:roomId/join',              authenticate, studySessionController.joinRoom);
router.post('/:roomId/approve/:userId',   authenticate, studySessionController.approveRequest);
router.post('/:roomId/reject/:userId',    authenticate, studySessionController.rejectRequest);
router.post('/:roomId/leave',             authenticate, studySessionController.leaveRoom);
router.post('/:roomId/end',               authenticate, studySessionController.endRoom);

module.exports = router;

