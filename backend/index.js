const {MongoClient, ServerApiVersion} = require("mongodb");
const express = require("express");
const app = express();
const port = 4000;

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@easy-sim.euunb.mongodb.net/?retryWrites=true&w=majority&appName=easy-sim`;

// Create a new MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Call the connect function to connect to MongoDB
connectToMongo();

// Route to handle GET request to the homepage
app.get("/", (req, res) => {
  res.send(`Hello, World! ${process.env.MONGO_URI}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
