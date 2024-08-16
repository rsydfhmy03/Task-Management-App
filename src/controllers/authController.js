const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ResponseFormatter = require('../utils/responseFormatter');
const { addTokenToBlacklist } = require('../middleware/blacklistToken');
const { secret, expiresIn } = require('../config/jwtConfig');
const { isValidDate } = require('../utils/isValidDate'); 
/**
 * Handler for user registration.
 *
 * @async
 * @function registerHandler
 */
async function registerHandler(req, res) {
  try {
    const { name, email, password, gender, birthDate, password_confirmation } = req.body;
    
    if (password !== password_confirmation) {
      return ResponseFormatter.fail(res, 'Password confirmation does not match password');
    }

    return !isValidDate(birthDate)
      ? ResponseFormatter.fail(res, 'Invalid birth date format')
      : (async () => {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.create({
            name,
            email,
            gender,
            birthDate,
            password: hashedPassword,
          });
          return ResponseFormatter.created(res, 'User registered successfully', user);
        })();
    
  } catch (error) {
    return ResponseFormatter.fail(res, error.message, 409);
  }
}

/**
 * Handler for user login.
 *
 * @async
 * @function loginHandler
 */
async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return ResponseFormatter.fail(res, 'Incorrect password', 401);
    }

    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const payload = { userId : user.id }
    const token = jwt.sign(payload, secret, { expiresIn })
    const responsePayload = {
      access_token : token,
      token_type : 'bearer',
      expiresIn: 604800,
      user : {
        name : user.name,
        email : user.email,
        gender : user.gender,
        birth_date : user.birthDate,
        email_verified: false
      }
    }
    return ResponseFormatter.success(res, 'Login successful', responsePayload );
  } catch (error) {
    return ResponseFormatter.fail(res, error.message, 401);
  }
}

/**
 * Handler for updating user password.
 *
 * @async
 * @function updatePasswordHandler
 */
async function updatePasswordHandler(req, res) {
  try {
    const { old_password, password, password_confirmation } = req.body;
    const user = req.user;

    if (password !== password_confirmation) {
      return ResponseFormatter.fail(res, 'Password confirmation does not match');
    }

    const match = await bcrypt.compare(old_password, user.password);
    if (!match) {
      return ResponseFormatter.fail(res, 'Old password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return ResponseFormatter.success(res, 'Password changed');
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}
/**
 * Handler for deleting user account.
 *
 * @async
 * @function deleteAccountHandler
 */
async function deleteAccountHandler(req, res) {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }

    await user.destroy();

    const token = req.headers['authorization'].split(' ')[1];
    addTokenToBlacklist(token);

    return ResponseFormatter.success(res, 'Account deleted successfully');
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}
/**
 * Handler for user logout.
 *
 * @async
 * @function logoutHandler
 */
async function logoutHandler(req, res) {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    addTokenToBlacklist(token)
    return ResponseFormatter.success(res, 'Logout successful');
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

module.exports = { registerHandler, loginHandler, updatePasswordHandler, logoutHandler, deleteAccountHandler};
