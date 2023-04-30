import express from 'express';
import RoomController from '../../controllers/rooms/rooms.controller';
//import uploadRoomPics from '../../middleware/room-images';

const router = express.Router();

//router.post('/', uploadRoomPics, RoomController.create);
router.post('/', RoomController.create);
router.get('/', RoomController.read);
router.put('/:id', RoomController.update);
router.delete('/:id', RoomController.delete);

export default router;
