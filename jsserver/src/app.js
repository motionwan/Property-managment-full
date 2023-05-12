const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const mqttClient = require('./controllers/device-control/device-control.controller');

// Load environment variables
config();

// Create Express app
const app = express();

//'http://localhost:3000',

const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
};

// Enable CORS
app.use(cors(corsOption));
//app.use(cors());

// Parse JSON request bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// const routes

// import buildingRouter from './routers/buildings/buildings.router';
// import roomRouter from './routers/rooms/rooms.router';
// import houseKeepingRouter from './routers/houseKeeping/houseKeeping.router';
// import usersRouter from './routers/users/users.router';
// import refreshRouter from './routers/Refresh/refresh.router';
// import bookingRouter from './routers/bookings/bookings.router';
//const deviceControlRouter = require('./routers/device-control/device-control.router');
const deviceRouter = require('./routers/device/device.router');

// app.use('/building', buildingRouter);
// app.use('/room', roomRouter);
// app.use('/house-keeping', houseKeepingRouter);
// app.use('/refresh', refreshRouter);
// app.use('/users', usersRouter);
// app.use('/booking', bookingRouter);
// app.use('/esp', deviceControlRouter);
app.use('/device', deviceRouter);

module.export = app;
