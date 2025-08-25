import express from 'express';
import morgan from 'morgan';
import imgRoutes from './routes/image.js';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/images', imgRoutes);
export default app;
//# sourceMappingURL=app.js.map