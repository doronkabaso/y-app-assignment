import fs from 'fs';
import { Image } from '../models/imageModel';

export const removeExpiredImages = async (): Promise<void> => {
  try {
    const expiredImages = await Image.find({ expiresAt: { $lt: new Date() } });
    const temp = await Image.find({}, { expiresAt: 1, _id: 0 })
    console.log(temp);
    console.log(new Date());
    for (const image of expiredImages) {
      if (fs.existsSync(image.filePath)) {
        fs.unlinkSync(image.filePath);
      }
      await Image.deleteOne({ _id: image._id });
    }
  } catch (error) {
    console.error('Error removing expired images:', error);
  }
};
