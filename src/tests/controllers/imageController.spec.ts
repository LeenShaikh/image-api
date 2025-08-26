import { imageController } from '../../controllers/imageController.js';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Adjusted paths for tests
const IMAGES_DIR = path.join(__dirname, '../../../images');
const CACHE_DIR = path.join(__dirname, '../../../cache');

describe('imageController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let sendFileSpy: jasmine.Spy;
  let statusSpy: jasmine.Spy;

  const testImagePath = path.join(IMAGES_DIR, 'palmtunnel.jpg');
  const cachedImagePath = path.join(CACHE_DIR, 'palmtunnel_200x300.jpg');

  beforeAll(async () => {
    // Ensure image directory exists
    if (!fs.existsSync(IMAGES_DIR))
      fs.mkdirSync(IMAGES_DIR, { recursive: true });
    //Ensure cache directory exists
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

    // Create a dummy image file for testing if it doesn't exist
    if (!fs.existsSync(testImagePath)) {
      await sharp({
        create: {
          width: 1,
          height: 1,
          channels: 3,
          background: { r: 255, g: 255, b: 255 }, //white background
        },
      })
        .jpeg()
        .toFile(testImagePath);
    }
  });

  beforeEach(() => {
    req = { query: {} };
    sendFileSpy = jasmine.createSpy('sendFile');
    statusSpy = jasmine
      .createSpy('status')
      .and.returnValue({ json: jasmine.createSpy() });
    res = {
      sendFile: sendFileSpy,
      status: statusSpy,
    };
    if (fs.existsSync(cachedImagePath)) {
      fs.unlinkSync(cachedImagePath); // Remove cached image before each test
    }
  });

  it('should return 404 if original image does not exist', async () => {
    req.query = { filename: 'nonexistent.jpg' };
    await imageController(req as Request, res as Response);

    expect(statusSpy).toHaveBeenCalledWith(404);
    expect(
      (statusSpy as jasmine.Spy).calls.mostRecent().returnValue.json,
    ).toHaveBeenCalledWith({ error: 'Original image not found.' });
    expect(sendFileSpy).not.toHaveBeenCalled();
  });

  it('should process image if all params are valid', async () => {
    req.query = {
      filename: 'palmtunnel.jpg',
      width: '200',
      height: '300',
      format: 'jpg',
    };
    await imageController(req as Request, res as Response);

    expect(sendFileSpy).toHaveBeenCalledWith(
      jasmine.stringMatching(/palmtunnel_200x300\.jpg$/),
    );
    expect(fs.existsSync(cachedImagePath)).toBeTrue();
  });

  it('should serve image from cache if it exists', async () => {
    fs.writeFileSync(cachedImagePath, 'cached image content');
    req.query = {
      filename: 'palmtunnel.jpg',
      width: '200',
      height: '300',
      format: 'jpg',
    };
    await imageController(req as Request, res as Response);
    expect(sendFileSpy).toHaveBeenCalledWith(cachedImagePath);
  });

  it('should return 500 if processing fails (sharp error)', async () => {
    req.query = {
      filename: 'palmtunnel.jpg',
      width: 'invalid', // Invalid width to trigger sharp error
      height: '300',
      format: 'jpg',
    };
    await imageController(req as Request, res as Response);

    expect(statusSpy).toHaveBeenCalledWith(500);
    expect(
      (statusSpy as jasmine.Spy).calls.mostRecent().returnValue.json,
    ).toHaveBeenCalledWith({ error: 'Error processing image.' });
    expect(sendFileSpy).not.toHaveBeenCalled();
  });
});
