import mongoose, { Document } from 'mongoose';
import { Users } from './users.mongo';
import { Device } from './devices.mongo';

export interface Log extends Document {
  eventType: String;
  description?: string;
  guestId: Users['_id'];
  deviceId: Device['_id'];
}

const logSchema = new mongoose.Schema<Log>(
  {
    eventType: { type: String, required: true },
    description: { type: String },

    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
  },
  { timestamps: true }
);

const logModel = mongoose.model<Log>('Log', logSchema);

export default logModel;
