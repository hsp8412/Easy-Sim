import mongoose, {Schema, Document, Model} from "mongoose";

// Define an interface for the Carrier document
export interface CarrierDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  logoUrl: string;
}

// Define the schema
const carrierSchema = new Schema<CarrierDocument>({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  logoUrl: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: Number.MAX_SAFE_INTEGER,
  },
});

export default mongoose.models.Carrier ||
  mongoose.model<CarrierDocument>("Carrier", carrierSchema);
