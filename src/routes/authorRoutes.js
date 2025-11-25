import { Router } from 'express';
import {
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
} from '../controllers/authorController.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = Router();

router.get('/', getAuthors);
router.post('/', authenticate, authorizeRoles('ADMIN'), postAuthor);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putAuthor);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteAuthor);

export default router;
