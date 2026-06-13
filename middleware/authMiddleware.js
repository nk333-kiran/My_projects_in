const jwt = require("jsonwebtoken"); // Import jsonwebtoken to verify authentication tokens

module.exports = (req, res, next) => {
  const token = req.header("Authorization"); // Read the Authorization header from the request

  if (!token) {
    return res.status(401).json({ // If no token is present, return 401 Unauthorized
      message: "No Token Found"
    });
  }

  try {
    const decoded = jwt.verify( // Verify the token using the secret key
      token.replace("Bearer ", ""), // Remove Bearer prefix if present
      process.env.JWT_SECRET
    );

    req.user = decoded; // Store decoded token payload on req.user for later middleware/routes

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ // If token verification fails, return 401 Unauthorized
      message: "Invalid Token"
    });
  }
};
