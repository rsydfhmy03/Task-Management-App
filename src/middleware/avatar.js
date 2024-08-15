const multer = require('multer');
const path = require('path');

// Configure storage for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

// Filter for allowed file types
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

// Initialize multer
const uploadAvatar = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = uploadAvatar;
