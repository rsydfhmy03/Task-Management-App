const express = require('express');
const { body } = require('express-validator');
const { registerHandler, loginHandler, updatePasswordHandler, logoutHandler, deleteAccountHandler } = require('../controllers/authController');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const router = express.Router();
const { registerValidator, loginValidator, updatePasswordValidator } = require('../validators/authValidators');

/**
 * Route to register a new user.
 *
 * @name POST /auth/register
 */
router.post('/register', registerValidator,  registerHandler);


/**
 * Route to log in a user.
 *
 * @name POST /auth/login
 */
router.post('/login', loginValidator, validateRequest, loginHandler);

/**
 * Route for deleting user account.
 *
 * @name DELETE /auth/delete-account
 */
router.delete('/delete-account', authenticate, deleteAccountHandler);

/**
 * Route for user logout.
 *
 * @name POST /auth/logout
 */
router.post('/logout', authenticate, logoutHandler);

/**
 * Route for updating user password.
 *
 * @name PUT /auth/update-password
 */
router.put('/update-password', authenticate, updatePasswordValidator, validateRequest, updatePasswordHandler);

module.exports = router;
