import { Router } from 'express';
import BuildingController from '../../controllers/buildings/buildings.controller';
import upload from '../../middleware/upload';

const router = Router();

// Create a new building
router.post('/', upload.single('logo'), BuildingController.create);

// Read a single building by id
router.get('/:id', BuildingController.read);

// Update a single building by id
router.put('/:id', BuildingController.update);

// Delete a single building by id
router.delete('/:id', BuildingController.delete);

// List all buildings
router.get('/', BuildingController.list);

export default router;
