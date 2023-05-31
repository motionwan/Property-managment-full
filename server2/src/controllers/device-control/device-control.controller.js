const { config } = require('dotenv');
const mqtt = require('mqtt');
const Device = require('../../models/devices.model');

config();

const mqttUrl = process.env.MQTT_URL || 'mqtt://localhost';
const mqttClient = mqtt.connect(mqttUrl);

// Connect to the MQTT broker
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to dynamic topics with a wildcard based on the connectionId and gangNumber
  mqttClient.subscribe('/devices/+/gangs/+/+', (err) => {
    if (err) {
      console.error('Error subscribing to MQTT topic', err);
    } else {
      console.log('Subscribed to MQTT topic');
    }
  });

  // Subscribe to dynamic topics with a wildcard based on the connectionId and gangNumber
  mqttClient.subscribe('/devices/+/gangs/+/schedule', (err) => {
    if (err) {
      console.error('Error subscribing to MQTT topic', err);
    } else {
      console.log('Subscribed to MQTT schedule topic');
    }
  });
});

// Handle incoming messages
mqttClient.on('message', async (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);

  try {
    if (topic === '/devices/setup') {
      const connectionId = message.toString();
      const device = await Device.findOne({ connectionId });

      if (device) {
        const status = device.status;
        for (const gangNumber in status) {
          const gangStatus = status[gangNumber];
          const gangTopic = `/devices/${connectionId}/gangs/${gangNumber}`;
          mqttClient.publish(gangTopic, gangStatus);
          console.log(
            `Published initial status on topic ${gangTopic}: ${gangStatus}`
          );
        }
      } else {
        console.error(`Device with connectionId ${connectionId} not found`);
      }
    } else if (topic.endsWith('/schedule')) {
      const topicRegex = /^\/devices\/(.+)\/gangs\/(.+)\/schedule$/;
      const match = topic.match(topicRegex);
      if (!match) {
        console.error('Invalid MQTT topic format');
        return;
      }
      const [, connectionId, gangNumber] = match;
      const scheduleData = JSON.parse(message.toString());

      // Log the received schedule data
      console.log(
        `Received schedule data for ${connectionId} - ${gangNumber}:`
      );
      console.log(scheduleData);

      // Check if the message originated from the device itself
      const deviceOriginated = scheduleData.deviceOriginated || false;

      if (!deviceOriginated) {
        // Publish the received schedule data back to the same topic
        const publishTopic = `/devices/${connectionId}/gangs/${gangNumber}/schedule`;
        mqttClient.publish(
          publishTopic,
          JSON.stringify({ ...scheduleData, deviceOriginated: true }),
          (err) => {
            if (err) {
              console.error('Error publishing MQTT message', err);
            } else {
              console.log(
                `Published MQTT message on topic ${publishTopic}: ${message.toString()}`
              );
            }
          }
        );

        // Process the schedule data and publish to the corresponding topic subscribed by the ESP
        // ...
      }
    } else {
      const topicRegex = /^\/devices\/(.+)\/gangs\/(.+)\/(on|off)$/;
      const match = topic.match(topicRegex);
      if (!match) {
        console.error('Invalid MQTT topic format');
        return;
      }
      const [, connectionId, gangNumber] = match;
      const scheduleData = JSON.parse(message.toString());

      // Log the received schedule data
      console.log(
        `Received schedule data for ${connectionId} - ${gangNumber}:`
      );
      console.log(scheduleData);

      // Check if the message originated from the device itself
      const deviceOriginated = scheduleData.deviceOriginated || false;

      if (!deviceOriginated) {
        // Publish the received schedule data back to the same topic
        const publishTopic = `/devices/${connectionId}/gangs/${gangNumber}/schedule`;
        mqttClient.publish(
          publishTopic,
          JSON.stringify({ ...scheduleData, deviceOriginated: true }),
          (err) => {
            if (err) {
              console.error('Error publishing MQTT message', err);
            } else {
              console.log(
                `Published MQTT message on topic ${publishTopic}: ${message.toString()}`
              );
            }
          }
        );

        // Process the schedule data and publish to the corresponding topic subscribed by the ESP
        // ...
      }
    }
  } catch (error) {
    console.error(`Error handling MQTT message: ${error}`);
  }
});

module.exports = mqttClient;
