import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import SwaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Adjust import paths based on environment
const isRender = process.env.RENDER === 'true' || process.cwd().includes('/opt/render');
const pathPrefix = isRender ? './' : './src/';

const authRoutes = (await import(pathPrefix + 'routes/authRoutes.js')).default;
const userRoutes = (await import(pathPrefix + 'routes/userRoutes.js')).default;
const bookRoutes = (await import(pathPrefix + 'routes/bookRoutes.js')).default;
const authorRoutes = (await import(pathPrefix + 'routes/authorRoutes.js')).default;
const genreRoutes = (await import(pathPrefix + 'routes/genreRoutes.js')).default;

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

export default app;
