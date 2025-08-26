import express from 'express';
import { validateParams } from '../middleware/validateParams.js';
import { imageController } from '../controllers/imageController.js';

const router = express.Router();
// Route : /api/images?filename=...&width=...&height=...&format=...
router.get('/', validateParams, imageController);

export default router;
