import React, { useState } from 'react';
import mqtt from 'mqtt';

const mqttBroker = 'ws://localhost:1234'; // MQTT broker IP address
const mqttTopicGang1 = 'devices/switch/gang1'; // MQTT topic for pinGang1
const mqttTopicGang2 = 'devices/switch/gang2'; // MQTT topic for pinGang2

const App = () => {
  const [statusGang1, setStatusGang1] = useState('off');
  const [statusGang2, setStatusGang2] = useState('off');

  const client = mqtt.connect(mqttBroker);

  // Handle MQTT connection
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
  });

  // Handle MQTT messages
  client.on('message', (topic, message) => {
    // Handle received messages if needed
  });

  const toggleGang1 = () => {
    const newStatus = statusGang1 === 'off' ? 'on' : 'off';
    client.publish(mqttTopicGang1, newStatus);
    setStatusGang1(newStatus);
  };

  const toggleGang2 = () => {
    const newStatus = statusGang2 === 'off' ? 'on' : 'off';
    client.publish(mqttTopicGang2, newStatus);
    setStatusGang2(newStatus);
  };

  return (
    <div>
      <h1>Control Panel</h1>
      <div>
        <h2>Gang 1</h2>
        <button onClick={toggleGang1}>
          {statusGang1 === 'off' ? 'Turn On' : 'Turn Off'}
        </button>
      </div>
      <div>
        <h2>Gang 2</h2>
        <button onClick={toggleGang2}>
          {statusGang2 === 'off' ? 'Turn On' : 'Turn Off'}
        </button>
      </div>
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import mqtt from 'mqtt';

// const DeviceControlApp = () => {
//   const [gang1On, setGang1On] = useState(false);
//   const [gang2On, setGang2On] = useState(false);
//   const [connectionId, setConnectionId] = useState('');

//   const mqttUrl = 'ws://localhost:1234'; // Update with your MQTT broker URL
//   const mqttClient = mqtt.connect(mqttUrl);

//   useEffect(() => {
//     mqttClient.on('connect', () => {
//       console.log('Connected to MQTT broker');
//       // Publish the connection ID to the 'devices/new-connection' topic
//       mqttClient.publish('devices/new-connection', connectionId);
//     });

//     mqttClient.on('message', (topic, message) => {
//       console.log('Received message:', topic, message.toString());
//       // Parse the topic and perform the necessary logic
//       if (topic === `devices/${connectionId}/switch/gang1`) {
//         setGang1On(message.toString() === 'on');
//       } else if (topic === `devices/${connectionId}/switch/gang2`) {
//         setGang2On(message.toString() === 'on');
//       }
//     });

//     // Cleanup the event listener on component unmount
//     return () => {
//       mqttClient.removeAllListeners('connect');
//       mqttClient.removeAllListeners('message');
//       mqttClient.end(); // Disconnect the MQTT client
//     };
//   }, [connectionId]);

//   const handleToggleGang1 = () => {
//     const newState = !gang1On;
//     setGang1On(newState);

//     const action = newState ? 'on' : 'off';

//     if (connectionId) {
//       // Publish MQTT message to the Gang 1 topic with the connection ID
//       mqttClient.publish(`devices/${connectionId}/switch/gang1`, action);
//     }
//   };

//   const handleToggleGang2 = () => {
//     const newState = !gang2On;
//     setGang2On(newState);

//     const action = newState ? 'on' : 'off';

//     if (connectionId) {
//       // Publish MQTT message to the Gang 2 topic with the connection ID
//       mqttClient.publish(`devices/${connectionId}/switch/gang2`, action);
//     }
//   };

//   return (
//     <div>
//       <input
//         type='text'
//         placeholder='Enter Connection ID'
//         value={connectionId}
//         onChange={(e) => setConnectionId(e.target.value)}
//       />

//       <div>
//         <h2>Gang 1</h2>
//         <button onClick={handleToggleGang1}>
//           {gang1On ? 'Turn Off' : 'Turn On'} Gang 1 Devices
//         </button>
//       </div>
//       <div>
//         <h2>Gang 2</h2>
//         <button onClick={handleToggleGang2}>
//           {gang2On ? 'Turn Off' : 'Turn On'} Gang 2 Devices
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeviceControlApp;
