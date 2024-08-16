const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const { User } = require('../models');
const { isTokenBlacklisted } = require('./blacklistToken');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Middleware for authentication.
 *
 * @function authenticate
 */
async function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return ResponseFormatter.fail(res, 'Unauthorized', 401);
  }

  // Check if token is blacklisted
  if (isTokenBlacklisted(token)) {
    return ResponseFormatter.fail(res, 'Token has been revoked', 401);
  }

  try {
    const decoded = jwt.verify(token, secret);
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
