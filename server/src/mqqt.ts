import { config } from 'dotenv';
import Aedes from 'aedes';
import { createServer, Server } from 'net';

config();

const AEDESPORT = process.env.AEDESPORT;
const aedes = new Aedes();
const aedesServer: Server = createServer(aedes.handle);

aedesServer.listen(Number(AEDESPORT), () => {
  console.log(`MQTT server started on port ${AEDESPORT}`);
});

export default aedes;
