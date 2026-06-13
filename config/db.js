const mongoose = require("mongoose"); // Import mongoose for MongoDB object modeling

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the URI from environment variables

    console.log("MongoDB Connected"); // Log success when the database connection is established
  } catch (error) {
    console.log(error.message); // Log the error message if connection fails
    process.exit(1); // Exit the process with error code 1 to indicate failure
  }
};

module.exports = connectDB; // Export the connectDB function for use in server.js
