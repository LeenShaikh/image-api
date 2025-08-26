import { Router } from 'express';
import { validateParams } from '../middleware/validateParams.js';
import { imageController } from '../controllers/imageController.js';
const router = Router();
// Route : /api/images?filename=...&width=...&height=...&format=...
router.get('/images', validateParams, imageController);
export default router;
//# sourceMappingURL=image.js.map
