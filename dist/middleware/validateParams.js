const MAX_DIMENSION = 2000; // Maximum allowed dimension in pixels
const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'gif']; // Supported image formats
// Middleware to validate query parameters for image processing
export const validateParams = (req, res, next) => {
    const { filename, width, height, format } = req.query;
    // Validate filename
    if (!filename || filename.trim() === '') {
        res.status(400).json({ error: 'Invalid or missing filename parameter.' });
        return;
    }
    // Validate width
    if (width) {
        if (isNaN(width) || width <= 0 || width > MAX_DIMENSION) {
            res.status(400).json({
                error: `Width must be a positive integer not exceeding ${MAX_DIMENSION}.`,
            });
            return;
        }
    }
    // Validate height
    if (height) {
        if (isNaN(height) || height <= 0 || height > MAX_DIMENSION) {
            res.status(400).json({
                error: `Height must be a positive integer not exceeding ${MAX_DIMENSION}.`,
            });
            return;
        }
    }
    // Validate format
    if (format) {
        if (!ALLOWED_FORMATS.includes(format.toLowerCase())) {
            res.status(400).json({
                error: `Format must be one of the following: ${ALLOWED_FORMATS.join(', ')}.`,
            });
            return;
        }
    }
    // If all validations pass, proceed to the next middleware or route handler
    next();
};
//# sourceMappingURL=validateParams.js.map