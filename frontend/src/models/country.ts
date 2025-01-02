import mongoose, {Types} from "mongoose";

export interface CountryDocument extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  ISO: string;
  image: string;
  flag: string;
}

/* countrySchema will correspond to a collection in your MongoDB database. */
const countrySchema = new mongoose.Schema<CountryDocument>({
  name: {
    /* The name of the country */
    type: String,
    required: [true, "Please provide a name for this country."],
    unique: true,
    maxlength: [100, "Country name cannot be more than 100 characters"],
  },
  ISO: {
    /* ISO code for the country */
    type: String,
    required: [true, "Please provide the ISO code for this country."],
    unique: true,
  },
  image: {
    /* URL to the country's image */
    type: String,
    required: [true, "Please provide an image URL for this country."],
  },
  flag: {
    /* URL to the country's flag */
    type: String,
    required: [true, "Please provide a flag URL for this country."],
  },
});

export default mongoose.models.Country ||
  mongoose.model<CountryDocument>("Country", countrySchema);
