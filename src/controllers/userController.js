const { User } = require('../models');
const ResponseFormatter = require('../utils/responseFormatter');
const { uploadAvatar } = require('../middleware/avatar');

/**
 * Handler for getting user details.
 *
 * @async
 * @function getUserDetailHandler
 */
async function getUserDetailHandler(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }
    return ResponseFormatter.success(res, 'User details retrieved', user);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

/**
 * Handler for updating user avatar.
 *
 * @async
 * @function updateAvatarHandler
 */
async function updateAvatarHandler(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }
    
    user.avatar = req.file.path;
    await user.save();

    return ResponseFormatter.success(res, 'Avatar updated successfully', { avatar: user.avatar });
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

/**
 * Handler for updating user profile.
 *
 * @async
 * @function updateProfileHandler
 */
async function updateProfileHandler(req, res) {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }

    user.name = name;
    user.email = email;
    await user.save();

    return ResponseFormatter.success(res, 'Profile updated successfully', user);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

module.exports = { getUserDetailHandler, updateAvatarHandler, updateProfileHandler };
