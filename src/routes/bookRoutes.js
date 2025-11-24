import { Router } from 'express';
import {
  getBooks,
  postBook,
  putBook,
  deleteBook,
} from '../controllers/bookController.js';

const router = Router();

// GET /books
router.get('/', getBooks);

// POST /books
router.post('/', postBook);

// PUT /books/:id
router.put('/:id', putBook);

// DELETE /books/:id
router.delete('/:id', deleteBook);

export default router;
