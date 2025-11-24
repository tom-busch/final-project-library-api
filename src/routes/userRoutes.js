import { Router } from 'express';
import {
  getUsers,
  postUser,
  putUser,
  patchUserRole,
  deleteUser,
} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', putUser);
router.patch('/:id/role', patchUserRole);
router.delete('/:id', deleteUser);

export default router;
