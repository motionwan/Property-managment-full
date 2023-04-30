import mongoose, { Document } from 'mongoose';
import { Building } from './buildings.mongo';
import { Room } from './rooms.mongo';
export interface Users extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  roomId?: Room['_id'];
  role: string;
  buildingId: Building['_id'];
  verified: boolean;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
}

const Users = new mongoose.Schema<Users>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'staff', 'guest'],
      default: 'guest',
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    phoneNumber: { type: String, unique: true },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const UsersSchema = mongoose.model<Users>('Users', Users);

export default UsersSchema;
