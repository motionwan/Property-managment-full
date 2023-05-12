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

const deviceRouter = require('./routers/devices/devices.router');

app.use('/devices', deviceRouter);
module.exports = app;
