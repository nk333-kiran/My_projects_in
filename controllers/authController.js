const User = require("../models/User"); // Import the User model to interact with users in MongoDB
const bcrypt = require("bcryptjs"); // Import bcryptjs to hash and compare passwords securely
const jwt = require("jsonwebtoken"); // Import jsonwebtoken to create authentication tokens

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extract name, email, and password from the request body

    if (!name || !email || !password) {
      return res.status(400).json({ // Return 400 if any required field is missing
        message: "All fields required"
      });
    }

    const existingUser = await User.findOne({ email }); // Check if the email already exists in the database

    if (existingUser) {
      return res.status(400).json({ // If user exists, return a 400 error
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 salt rounds

    const user = await User.create({ // Create a new user record in MongoDB
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ // Respond with status 201 and the created user data
      message: "User Registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ // On error, return 500 and the error message
      message: error.message
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body

    const user = await User.findOne({ email }); // Find a user record by email

    if (!user) {
      return res.status(400).json({ // If no user is found, return 400
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(password, user.password); // Compare submitted password to stored hash

    if (!match) {
      return res.status(400).json({ // If password does not match, return 400
        message: "Wrong Password"
      });
    }

    const token = jwt.sign( // Create a JWT token with the user id payload
      {
        id: user._id
      },
      process.env.JWT_SECRET, // Use secret from environment variables
      {
        expiresIn: "1d" // Token expires in 1 day
      }
    );

    res.status(200).json({ // Return the token to the client
      token
    });
  } catch (error) {
    res.status(500).json({ // On error, return 500 and the error message
      message: error.message
    });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Query all users and exclude the password field

    res.status(200).json(users); // Return the list of users
  } catch (error) {
    res.status(500).json({ // On error, return 500 and the error message
      message: error.message
    });
  }
};

// Get User By Id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Find the user by id and omit password

    if (!user) {
      return res.status(404).json({ // If user is not found, return 404
        message: "User Not Found"
      });
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    res.status(500).json({ // On error, return 500 and the error message
      message: error.message
    });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate( // Update user by id using request body data
      req.params.id,
      req.body,
      {
        new: true // Return the updated document
      }
    );

    res.status(200).json(user); // Return the updated user
  } catch (error) {
    res.status(500).json({ // On error, return 500 and the error message
      message: error.message
    });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id); // Delete the user by id from the database

    res.status(200).json({ // Return success message
      message: "User Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({ // On error, return 500 and the error message
      message: error.message
    });
  }
};
