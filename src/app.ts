import express from 'express';
import imgRoutes from './routes/image.js';

const app = express();

app.use('/api', imgRoutes);

export default app;
