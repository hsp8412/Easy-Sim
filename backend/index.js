import {connectToMongo} from "./startup/db.js";
import express from "express";
import setupRoutes from "./startup/routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Call the connect function to connect to MongoDB
connectToMongo();
app.use(cookieParser());
app.use(express.json());

// Call the setupRoutes function to setup the routes
setupRoutes(app);

// Route to handle GET request to the homepage
app.get("/", (req, res) => {
  res.send(`Hello, World!`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
