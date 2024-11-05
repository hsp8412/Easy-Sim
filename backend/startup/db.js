import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@easy-sim.euunb.mongodb.net/easy-sim?retryWrites=true&w=majority`;

export async function connectToMongo() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB using Mongoose");
  } catch (err) {
    console.error("Error connecting to MongoDB with Mongoose:", err);
  }
}
