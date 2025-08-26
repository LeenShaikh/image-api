import express from 'express';
import imgRoutes from './routes/image.js';

const app = express();
app.use(express.json());

app.use('/api/images', imgRoutes);

export default app;
