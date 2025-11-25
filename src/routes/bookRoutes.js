import { Router } from 'express';
import {
  getBooks,
  postBook,
  putBook,
  deleteBook,
} from '../controllers/bookController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = Router();

// GET /books
router.get('/', getBooks);

// POST /books
router.post('/', authenticate, authorizeRoles('ADMIN'), postBook);

// PUT /books/:id
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putBook);

// DELETE /books/:id
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteBook);

export default router;
