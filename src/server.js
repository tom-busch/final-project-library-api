import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import SwaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import genreRoutes from './routes/genreRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const specs = YAML.load('./public/bundled.yaml');
app.use('/shelfserve-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/genres', genreRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('ShelfServe API is running 🚀');
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
