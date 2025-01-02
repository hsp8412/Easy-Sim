import mongoose, {Document, Schema} from "mongoose";

// Define an interface for the Token document
export interface TokenDocument extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  consumed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Token collection
const TokenSchema = new mongoose.Schema<TokenDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User ID is required."],
  },
  token: {
    type: String,
    unique: true,
    required: [true, "Token is required."],
  },
  consumed: {
    type: Boolean,
    default: false,
    required: [true, "Consumed status is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "Creation date is required."],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: [true, "Update date is required."],
  },
});

// Export the Token model
export default mongoose.models.Token ||
  mongoose.model<TokenDocument>("Token", TokenSchema);
