import { Request, Response } from 'express';
import DeviceModel from '../../models/devices.mongo';

class DeviceController {
  // Get all amenities
  async getAll(req: Request, res: Response) {
    try {
      const amenities = await DeviceModel.find({});
      res.status(200).send(amenities);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  // Get a specific device by ID
  async getById(req: Request, res: Response) {
    try {
      const device = await DeviceModel.findById(req.params.id);
      if (!device) {
        return res.status(404).send({ message: 'Device not found' });
      }
      res.status(200).send(device);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  // Create a new device
  async create(req: Request, res: Response) {
    try {
      const {
        type,
        model,
        gang,
        additionalAttributes,
        name,
        roomId,
        buildingId,
      } = req.body;
      const device = new DeviceModel({
        type,
        roomId,
        model,
        gang,
        additionalAttributes,
        name,
        buildingId,
      });
      await device.save();
      res.status(201).json({
        type,
        roomId,
        model,
        gang,
        additionalAttributes,
        name,
        connectionId: device.connectionId,
      });

      console.log({
        type,
        roomId,
        model,
        gang,
        additionalAttributes,
        name,
        connectionId: device.connectionId,
      });
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Update an existing device by ID
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        type,
        roomId,
        model,
        gang,
        additionalAttributes,
        name,
        buildingId,
      } = req.body;
      const device = await DeviceModel.findByIdAndUpdate(
        id,
        { type, roomId, model, gang, additionalAttributes, name, buildingId },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!device) {
        return res.status(404).send({ message: 'Device not found' });
      }
      res.status(200).send(device);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }

  // Delete an existing device by ID
  async delete(req: Request, res: Response) {
    try {
      const device = await DeviceModel.findByIdAndDelete(req.params.id);
      if (!device) {
        return res.status(404).send({ message: 'Device not found' });
      }
      res.status(200).send({ message: 'Device deleted' });
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default DeviceController;
