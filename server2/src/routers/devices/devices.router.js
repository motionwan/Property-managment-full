const { Router } = require('express');

const router = Router();

const DeviceController = require('../../controllers/devices/devices.controller');

const devices = new DeviceController();

router.post('/', devices.create);

module.exports = router;
