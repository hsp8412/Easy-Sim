const express = require("express");
const app = express();
const port = 4000;

// Route to handle GET request to the homepage
app.get("/", (req, res) => {
  res.send(`Hello, World! ${process.env.MONGO_URI}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
