const express = require('express');
const { body } = require('express-validator');
const { getUserDetailHandler, updateAvatarHandler, updateProfileHandler } = require('../controllers/userController');
const validateRequest = require('../utils/validateRequest');
const { updateUserValidator } = require('../validators/uservalidators');
const authenticate = require('../middleware/authentication');
const avatar = require('../middleware/avatar');
const router = express.Router();

/**
 * Get user details.
 *
 * @name GET /user/detail
 */
router.get('/detail', authenticate, getUserDetailHandler);

/**
 * Update user avatar.
 *
 * @name POST /user/avatar
 */
router.post('/avatar', authenticate, avatar.single('avatar'), updateAvatarHandler);

/**
 * Update user profile.
 *
 * @name PUT /user/update
 */
router.put('/update', authenticate, updateUserValidator, validateRequest, updateProfileHandler);

module.exports = router;
