const { config } = require('dotenv');
const app = require('./app');
const http = require('http');
const Aedes = require('aedes');
const { createServer } = require('net');
const ws = require('websocket-stream');

// load configuration
config();

const PORT = process.env.PORT || 3005;
const MQTT_PORT = process.env.MQTT_PORT || 1883;

const wssPort = 1884;
const host = '0.0.0.0'; // localhost

const server = http.createServer(app);

const aedes = new Aedes();
const aedesServer = createServer(aedes.handle);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

aedesServer.listen(MQTT_PORT, () => {
  console.log(`MQTT server started on port ${MQTT_PORT}`);
});

const wsSslServer = http.createServer({});
ws.createServer({ server: wsSslServer }, aedes.handle);
wsSslServer.listen(wssPort, host, function () {
  console.log('WSS server listening on port', wssPort);
});
