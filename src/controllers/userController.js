const { User } = require('../models');
const ResponseFormatter = require('../utils/responseFormatter');
// const { uploadAvatar } = require('../middleware/avatar');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bucket = require('../config/storageConfig');
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
 * Update Avatar Handler
 *
 * Updates the avatar of the authenticated user.
 *
 * @async
 * @function updateAvatarHandler
 * @param {Object} req - Express request object
 * @param {Object} req.user - The authenticated user
 * @param {Object} req.file - The uploaded avatar file
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
async function updateAvatarHandler(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(user)
    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }

    const file = req.file;

    if (!file) {
      return ResponseFormatter.fail(res, 'No file uploaded', 400);
    }
    console.log('Uploaded file details:', file);
    const blob = bucket.file(`avatars/${uuidv4()}_${path.basename(file.originalname)}`);
    const blobStream = blob.createWriteStream({ resumable: false });
    blobStream.on('error', (err) => {
      return ResponseFormatter.error(res, err.message, 500);
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      
      user.avatar = publicUrl;
      await user.save();

      return ResponseFormatter.success(res, 'Avatar updated successfully', { avatar: user.avatar });
    });

    blobStream.end(file.buffer);
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
    const { name, email, gender, birth_date } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }

    // Update only the fields that are provided in the request body
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (gender !== undefined) user.gender = gender;
    if (birth_date !== undefined) user.birthDate = new Date(birth_date); 

    await user.save();

    return ResponseFormatter.success(res, 'Profile updated successfully', user);
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

module.exports = { getUserDetailHandler, updateAvatarHandler, updateProfileHandler };
