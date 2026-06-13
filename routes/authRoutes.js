const express = require("express"); // Import Express to create a router

const router = express.Router(); // Create a new router instance

const auth = require("../middleware/authMiddleware"); // Import middleware to protect authenticated routes

const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/authController"); // Import controller functions to handle route logic

router.post("/register", register); // POST /api/auth/register creates a new user

router.post("/login", login); // POST /api/auth/login logs in a user

router.get("/users", auth, getUsers); // GET /api/auth/users returns all users and requires auth

router.get("/users/:id", auth, getUserById); // GET /api/auth/users/:id returns one user by id and requires auth

router.put("/users/:id", auth, updateUser); // PUT /api/auth/users/:id updates a user by id and requires auth

router.delete("/users/:id", auth, deleteUser); // DELETE /api/auth/users/:id removes a user by id and requires auth

module.exports = router; // Export the router for use in server.js
