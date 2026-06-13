require("dotenv").config(); // Load environment variables from the .env file into process.env

const express = require("express"); // Import the Express framework to create the server

const connectDB = require("./config/db"); // Import the database connection helper

const app = express(); // Create a new Express application instance

connectDB(); // Establish a connection to MongoDB before handling requests

app.use(express.json()); // Add middleware that parses JSON request bodies automatically

app.use(
  "/api/auth",
  require("./routes/authRoutes") // Register authentication routes under /api/auth
);

app.get("/", (req, res) => {
  res.send("Professional User CRUD API Running"); // Root endpoint returns a simple status message
});

const PORT = process.env.PORT || 5000; // Use configured PORT or default to 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`); // Start the server and log the listening port
});