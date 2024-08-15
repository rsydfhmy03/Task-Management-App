const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Middleware for authentication.
 *
 * @function authenticate
 */
async function authenticate(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return ResponseFormatter.fail(res, 'No token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }
    
    req.user = user;
    next();
  } catch (error) {
    return ResponseFormatter.fail(res, 'Invalid token', 401);
  }
}

module.exports = authenticate;
