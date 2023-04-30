import { config } from 'dotenv';
import app from './app';
import http from 'http';
import Aedes from 'aedes';
import { createServer } from 'net';

// load configuration
config();

const PORT = process.env.PORT || 3005;
const AEDESPORT = process.env.AEDESPORT;
const server = http.createServer(app);
const aedes = new Aedes();
const aedesServer = createServer(aedes.handle);

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

aedesServer.listen(AEDESPORT, () => {
  console.log(`mqqt server started on port ${AEDESPORT}`);
});
