import { Router } from 'express';
import {
  getGenres,
  postGenre,
  putGenre,
  deleteGenre,
} from '../controllers/genreController.js';

const router = Router();

// GET /genres
router.get('/', getGenres);

// POST /genres
router.post('/', postGenre);

// PUT /genres/:id
router.put('/:id', putGenre);

// DELETE /genres/:id
router.delete('/:id', deleteGenre);

export default router;
