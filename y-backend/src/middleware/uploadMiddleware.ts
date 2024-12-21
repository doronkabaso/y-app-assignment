import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: 'uploads/', // Folder to save the files
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png'; // Default to .png if no extension
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Multer middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.mimetype)) {
      return cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'));
    }
    cb(null, true);
  },
});

export default upload;
