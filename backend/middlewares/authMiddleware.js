// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'hbhghghghhg';

const authenticateToken = async (req, res, next) => {
  try {
    // Get the JWT token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized: Missing token' });

    // Verify the token
    const decoded = jwt.verify(token,JWT_SECRET);
    
    // Check if the user exists
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized: User not found' });

    // Attach the user object to the request for further use
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { authenticateToken };
