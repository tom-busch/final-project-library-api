import { Router } from 'express';
import {
  getUsers,
  postUser,
  putUser,
  patchUserRole,
  deleteUser,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getUsers);
router.post('/', authenticate, authorizeRoles('ADMIN'), postUser);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putUser);
router.patch('/:id/role', authenticate, authorizeRoles('ADMIN'), patchUserRole);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteUser);

export default router;
