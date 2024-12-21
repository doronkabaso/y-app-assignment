import express from 'express';
import { uploadImage, getImage } from '../controllers/imageController';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/', upload.single('file'), uploadImage);

router.get('/:imageID', getImage);

export default router;
