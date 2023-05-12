const { config } = require('dotenv');
const mqtt = require('mqtt');
const Device = require('../../models/devices.model');

config();

const mqttUrl = process.env.MQTT_URL || 'mqtt://localhost';
const mqttClient = mqtt.connect(mqttUrl);

const mqttTopicGang1 = 'devices/switch/gang1'; // MQTT topic for pinGang1
const mqttTopicGang2 = 'devices/switch/gang2'; // MQTT topic for pinGang2
const mqttTopicConnections = 'devices/connections';

// Handle MQTT connection
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  // Subscribe to topics
  mqttClient.subscribe(mqttTopicConnections);

  // Subscribe to topics
  mqttClient.subscribe(mqttTopicGang1);
  mqttClient.subscribe(mqttTopicGang2);
});

// Handle MQTT messages
mqttClient.on('message', async (topic, message) => {
  // Convert message to string
  const payload = message.toString();

  // Check topic and toggle pins accordingly
  if (topic === mqttTopicConnections) {
    const connectionId = payload;
    console.log(`Received connection ID: ${connectionId}`);

    // Search for device by connection ID
    const device = await Device.findOne({ connectionId });

    if (device) {
      const gang1Value = device.status.gang1;
      const gang2Value = device.status.gang2;
      // Publish initial state of each gang to their corresponding topic
      if (gang1Value) {
        mqttClient.publish(mqttTopicGang1, gang1Value);
      }
      if (gang2Value) {
        mqttClient.publish(mqttTopicGang2, gang2Value);
      }
      console.log(`Device found: ${device.name}`);
      // Extract initial state from device status
    }
  } else if (topic === mqttTopicGang1) {
    if (payload === 'on') {
      // Code to perform action when pinGang1 is turned on
      console.log('pinGang1 turned on');
    } else if (payload === 'off') {
      // Code to perform action when pinGang1 is turned off
      console.log('pinGang1 turned off');
    }
  } else if (topic === mqttTopicGang2) {
    if (payload === 'on') {
      // Code to perform action when pinGang2 is turned on
      console.log('pinGang2 turned on');
    } else if (payload === 'off') {
      // Code to perform action when pinGang2 is turned off
      console.log('pinGang2 turned off');
    }
  }
});

module.exports = mqttClient;
