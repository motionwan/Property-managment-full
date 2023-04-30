import mongoose, { Schema, Types, Document } from 'mongoose';

export interface Room extends Document {
  roomNumber?: string;
  type: string;
  price: number;
  capacity: number;
  occupied: boolean;
  checkInTime: string;
  checkOutTime: string;
  devices: string[]; // an array of devices' connectionIds
  //roomPics: string[];
  buildingId: Types.ObjectId;
}

const roomSchema = new mongoose.Schema<Room>(
  {
    roomNumber: { type: String, unique: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: true },
    occupied: { type: Boolean, required: true, default: false },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    devices: [{ type: String, required: true }],
    //roomPics: [{ type: String, required: true }],
    buildingId: {
      type: Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model<Room>('Room', roomSchema);

export default RoomModel;
