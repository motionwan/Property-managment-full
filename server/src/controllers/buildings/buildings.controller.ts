import { Request, Response } from 'express';
import BuildingModel from '../../models/buildings.mongo';

class BuildingController {
  // Create a new building
  async create(req: Request, res: Response) {
    try {
      const { name, address, city, state, phone, email, country, settings } =
        req.body;

      let logo: string = '';
      if (req.file) {
        logo = req.file.path;
      }

      const building = new BuildingModel({
        name,
        address,
        city,
        state,
        phone,
        email,
        country,
        settings,
        logo,
      });

      await building.save();
      res.status(201).json({ message: 'Building created', building });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Read a single building by id
  async read(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const building = await BuildingModel.findById(id);
      if (!building) {
        return res.status(404).json({ message: 'Building not found' });
      }
      res.status(200).json(building);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a single building by id
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, address, city, state, phone, email, country, settings } =
        req.body;
      const building = await BuildingModel.findById(id);
      if (!building) {
        return res.status(404).json({ message: 'Building not found' });
      }
      const updateFields: any = {
        name,
        address,
        city,
        state,
        phone,
        email,
        country,
        'settings.senderEmail': settings.senderEmail,
        'settings.sendGridApiKey': settings.sendGridApiKey,
        'settings.hubtelApiSecret': settings.hubtelApiSecret,
        'settings.hubtelClientId': settings.hubtelClientId,
      };
      if (req.file) {
        updateFields.logo = req.file.path;
      }
      const updatedBuilding = await building.updateOne(updateFields);
      res
        .status(200)
        .json({ message: 'Building updated', building: updatedBuilding });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a single building by id
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const building = await BuildingModel.findByIdAndDelete(id);
      if (!building) {
        return res.status(404).json({ message: 'Building not found' });
      }
      res.status(200).json({ message: 'Building deleted', building });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // List all buildings
  async list(req: Request, res: Response) {
    try {
      const buildings = await BuildingModel.find({});
      res.status(200).json(buildings);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new BuildingController();
