import { Router } from 'express';
import {
  getGenres,
  postGenre,
  putGenre,
  deleteGenre,
} from '../controllers/genreController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = Router();

// GET /genres
router.get('/', getGenres);

// POST /genres
router.post('/', authenticate, authorizeRoles('ADMIN'), postGenre);

// PUT /genres/:id
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putGenre);

// DELETE /genres/:id
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteGenre);

export default router;
