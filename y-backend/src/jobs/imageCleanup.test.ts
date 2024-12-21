import { removeExpiredImages } from './imageCleanup';
import { Image } from '../models/imageModel';
import fs from 'fs';

jest.mock('../models/imageModel');
jest.mock('fs');

describe('removeExpiredImages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove expired images from the database and file system', async () => {
    const mockImages = [
      { _id: '1', filePath: 'path/to/image1.png' },
      { _id: '2', filePath: 'path/to/image2.png' },
    ];

    // Mocking Image.find to return mockImages
    (Image.find as jest.Mock).mockResolvedValue(mockImages);

    // Mocking file system functions
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});

    // Mocking Image.deleteOne
    (Image.deleteOne as jest.Mock).mockResolvedValue({});

    // Run the cleanup function
    await removeExpiredImages();

    // Verify database and file system calls
    expect(Image.find).toHaveBeenCalledWith({ expiresAt: { $lt: expect.any(Date) } });
    expect(fs.existsSync).toHaveBeenCalledTimes(2);
    expect(fs.unlinkSync).toHaveBeenCalledTimes(2);
    expect(Image.deleteOne).toHaveBeenCalledTimes(2);
    expect(Image.deleteOne).toHaveBeenCalledWith({ _id: '1' });
    expect(Image.deleteOne).toHaveBeenCalledWith({ _id: '2' });
  });

  it('should handle errors gracefully if file does not exist', async () => {
    const mockImages = [
      { _id: '1', filePath: 'path/to/image1.png' },
    ];

    // Mocking Image.find to return mockImages
    (Image.find as jest.Mock).mockResolvedValue(mockImages);

    // Mocking file system functions
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    // Mocking Image.deleteOne
    (Image.deleteOne as jest.Mock).mockResolvedValue({});

    // Run the cleanup function
    await removeExpiredImages();

    // Verify database and file system calls
    expect(fs.unlinkSync).not.toHaveBeenCalled();
    expect(Image.deleteOne).toHaveBeenCalledWith({ _id: '1' });
  });
});
