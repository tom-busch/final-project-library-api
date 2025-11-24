import { Router } from 'express';
import {
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
} from '../controllers/authorController.js';

const router = Router();

router.get('/', getAuthors);
router.post('/', postAuthor);
router.put('/:id', putAuthor);
router.delete('/:id', deleteAuthor);

export default router;
