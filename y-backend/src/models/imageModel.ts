import mongoose, { Document, Schema } from 'mongoose';

export interface ImageDocument extends Document {
  filePath: string;
  expiresAt: Date;
}

const ImageSchema = new Schema<ImageDocument>({
  filePath: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: '1s' } },
});

export const Image = mongoose.model<ImageDocument>('Image', ImageSchema);
