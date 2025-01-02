import mongoose, {Document, Schema} from "mongoose";

// Define an interface for the Product document
export interface ProductDocument extends Document {
  _id: mongoose.Types.ObjectId;
  carrierId: mongoose.Types.ObjectId;
  countryId: mongoose.Types.ObjectId;
  duration: number; // in days
  speed: string;
  size: number; // in GB
  price: number;
  identityVerification: boolean;
  topUp: boolean;
  country: string;
  createdDate: Date;
  status: "active" | "inactive";
}

// Define the schema for the Product collection
const productSchema = new mongoose.Schema<ProductDocument>({
  carrierId: {
    type: Schema.Types.ObjectId,
    ref: "Carrier",
    required: [true, "Carrier ID is required."],
  },
  countryId: {
    type: Schema.Types.ObjectId,
    ref: "Country",
    required: [true, "Country ID is required."],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required."],
    min: [1, "Duration must be at least 1 day."],
  },
  speed: {
    type: String,
    required: [true, "Speed is required."],
  },
  size: {
    type: Number,
    required: [true, "Size is required."],
    min: [1, "Size must be at least 1 GB."],
    comment: "Size in GB",
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    min: [0, "Price must be non-negative."],
  },
  identityVerification: {
    type: Boolean,
    required: [true, "Identity verification status is required."],
    default: false,
  },
  topUp: {
    type: Boolean,
    required: [true, "Top-up status is required."],
    default: false,
  },
  country: {
    type: String,
    required: [true, "Country is required."],
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: [true, "Created date is required."],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: [true, "Status is required."],
  },
});

// Export the Product model
export default mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", productSchema);
