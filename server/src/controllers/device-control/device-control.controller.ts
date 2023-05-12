import { Request, Response } from 'express';

const controlESP32 = (req: Request, res: Response) => {
  const aedes = req.app.get('aedes'); // Get the `aedes` MQTT connection from the app object

  // Extract the control data from the request body
  const { connectionId, topic, message } = req.body;

  // Prepare the control topic using the connection ID
  const controlTopic = `esp32/${connectionId}/${topic}`;

  // Publish the control message to the specific ESP32 topic
  aedes.publish({ topic: controlTopic, payload: message });

  // Send a response indicating successful control
  res.json({
    message: `Control message sent to ESP32 with connection ID ${connectionId}`,
  });
};

export { controlESP32 };
