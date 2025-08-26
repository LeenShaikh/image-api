import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import type { ImageParams } from '../types/image.js';

// To get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories for original and cached images
const IMAGES_DIR = path.join(__dirname, '../../images');
const CACHE_DIR = path.join(__dirname, '../../cache');

// Controller to handle image processing requests
export const imageController = async (
  req: Request<unknown, unknown, unknown, ImageParams>,
  res: Response,
) => {
  try {
    const { filename, width, height, format } = req.query;

    const inputPath = path.join(IMAGES_DIR, filename);

    // Check if the original image exists
    if (!fs.existsSync(inputPath)) {
      return res.status(404).json({ error: 'Original image not found.' });
    }

    const widthStr = width ? String(width) : 'auto';
    const heightStr = height ? String(height) : 'auto';
    const formatStr = format ? String(format) : 'jpeg';

    const outputFilename = `${path.parse(filename).name}_${widthStr}x${heightStr}.${formatStr}`;
    const outputPath = path.join(CACHE_DIR, outputFilename);
    // serve from cache if exists
    if (fs.existsSync(outputPath)) {
      return res.sendFile(outputPath);
    }

    // If not in cache, process the image

    await sharp(inputPath)
      .resize(
        width ? Number(width) : undefined,
        height ? Number(height) : undefined,
      )
      .toFormat(formatStr as keyof sharp.FormatEnum)
      .toFile(outputPath);
    return res.sendFile(outputPath);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Error processing image.' });
  }
};
