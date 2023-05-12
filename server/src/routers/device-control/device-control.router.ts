import express, { Request, Response } from 'express';
import { controlESP32 } from '../../controllers/device-control/device-control.controller';

const router = express.Router();

// Route for controlling the ESP32 device
router.post('/', (req: Request, res: Response) => controlESP32(req, res));

export default router;
