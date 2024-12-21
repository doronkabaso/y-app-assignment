import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Image } from '../models/imageModel';

// POST /v1/images
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    const expiresAt = req.body.expiresAt;
    if (!req.file || !expiresAt) {
        res.status(400).json({ error: 'File and expiration time are required.' });
        return;
    }

    try {
        const image = new Image({
        filePath: req.file.path,
        expiresAt,
        });
        await image.save();

        res.status(201).json({
        url: `http://localhost:5000/v1/images/${image._id}`,
        });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ error: 'Failed to upload image.' });
    }
};

// GET /v1/images/:imageID
export const getImage = async (req: Request, res: Response): Promise<void> => {
  console.log(req.params);
  const { imageID } = req.params;

  try {
    const image = await Image.findById(imageID);

    if (!image) {
        res.status(404).json({ error: 'Image not found or has expired.' });
    } else {
        const filePath = path.resolve(image.filePath);

        if (!fs.existsSync(filePath)) {
          res.status(404).json({ error: 'Image file not found.' });
        }
    
        res.sendFile(filePath);
    }
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'Failed to retrieve image.' });
  }
};
