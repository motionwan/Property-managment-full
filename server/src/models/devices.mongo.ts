import mongoose, { Document, Schema } from 'mongoose';
import { Building } from './buildings.mongo';
import { Room } from './rooms.mongo';

export interface Device extends Document {
  type: string;
  model: string;
  name?: string;
  gang?: number;
  additionalAttributes: Record<string, any>;
  roomId?: Room['_id'];
  status: boolean;
  buildingId?: Building['_id'];
  connectionId?: string;
}

const deviceSchema = new Schema<Device>(
  {
    type: { type: String, required: true },
    name: { type: String },
    model: { type: String, required: true },
    status: {
      type: Schema.Types.Mixed,
      required: true,
      default: function () {
        if (this.gang) {
          const gangsStatus: any = {};
          for (let i = 1; i <= this.gang; i++) {
            gangsStatus[`gang${i}`] = false;
          }
          return gangsStatus;
        }
        return {};
      },
    },
    gang: { type: Number },
    connectionId: { type: String, unique: true },
    buildingId: {
      type: Schema.Types.ObjectId,
      ref: 'Building',
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    additionalAttributes: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

deviceSchema.pre<Device>('save', async function (next) {
  if (!this.connectionId) {
    // Generate a random connection ID if it doesn't exist
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const connectionIdLength = 6;
    let connectionId = '';

    for (let i = 0; i < connectionIdLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      connectionId += characters[randomIndex];
    }

    this.connectionId = connectionId;
  }

  next();
});

const deviceModel = mongoose.model<Device>('Device', deviceSchema);

export default deviceModel;
