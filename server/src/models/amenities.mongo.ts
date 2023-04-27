import mongoose, { Document } from 'mongoose';
import { Building } from './buildings.mongo';

export interface Amenity extends Document {
  name: String;
  condition: string;
  buildingId: Building['_id'];
}

const aminitySchema = new mongoose.Schema<Amenity>({
  name: { type: String, required: true },
  condition: { type: String, required: true },

  buildingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
    required: true,
  },
});

const AmenityModel = mongoose.model<Amenity>('Amenity', aminitySchema);

export default AmenityModel;
