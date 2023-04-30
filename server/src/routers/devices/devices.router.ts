import { Router } from 'express';
import DeviceController from '../../controllers/devices/devices.controller';

const router = Router();
const deviceController = new DeviceController();

// GET all amenities
router.get('/', deviceController.getAll);

// GET a specific device by ID
router.get('/:id', deviceController.getById);

// CREATE a new device
router.post('/', deviceController.create);

// UPDATE an existing device by ID
router.put('/:id', deviceController.update);

// DELETE an existing device by ID
router.delete('/:id', deviceController.delete);

export default router;
