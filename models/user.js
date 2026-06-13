const mongoose = require("mongoose"); // Import mongoose to define a schema and model

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Name must be a string
      required: true // Name is required for every user
    },

    email: {
      type: String, // Email must be a string
      required: true, // Email is required for every user
      unique: true // Each email must be unique in the database
    },

    password: {
      type: String, // Password must be a string
      required: true // Password is required for every user
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema); // Export the User model for use elsewhere in the app
