const { config } = require('dotenv');
const mqtt = require('mqtt');

config();

const mqttUrl = process.env.MQTT_URL || 'mqtt://localhost';
const mqttClient = mqtt.connect(mqttUrl);

const mqttTopicGang1 = 'devices/switch/gang1'; // MQTT topic for pinGang1
const mqttTopicGang2 = 'devices/switch/gang2'; // MQTT topic for pinGang2

// Handle MQTT connection
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to topics
  mqttClient.subscribe(mqttTopicGang1);
  mqttClient.subscribe(mqttTopicGang2);
});

// Handle MQTT messages
mqttClient.on('message', (topic, message) => {
  // Convert message to string
  const payload = message.toString();

  // Check topic and toggle pins accordingly
  if (topic === mqttTopicGang1) {
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
