import express from 'express';
import mongoose from 'mongoose';
import imageRoutes from './routes/imageRoutes';
import cors from 'cors'; 
import cron from 'node-cron';
import { removeExpiredImages } from './jobs/imageCleanup';

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/v1/images', imageRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/image-sharing')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

cron.schedule('*/30 * * * * *', async () => {
    console.log('Running cleanup job...');
    await removeExpiredImages();
});
  