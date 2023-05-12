const express = require('express');
const DeviceController = require('../../controllers/device/device.controller');

const router = express.Router();
const deviceController = new DeviceController();

// CREATE a new device
router.post('/', deviceController.create);

// // GET all amenities
// router.get('/', deviceController.getAll);

// // GET a specific device by ID
// router.get('/:id', deviceController.getById);

// // UPDATE an existing device by ID
// router.put('/:id', deviceController.update);

// // DELETE an existing device by ID
// router.delete('/:id', deviceController.delete);

module.exports = router;
