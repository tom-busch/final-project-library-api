const { Router } = require('express');
const {
  getUsers,
  postUser,
  putUser,
  patchUserRole,
  deleteUser,
} = require('../controllers/userController.js');
const { authenticate } = require('../middleware/authenticate.js');
const { authorizeRoles } = require('../middleware/authorizeRoles.js');

const router = Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getUsers);
router.post('/', authenticate, authorizeRoles('ADMIN'), postUser);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putUser);
router.patch('/:id/role', authenticate, authorizeRoles('ADMIN'), patchUserRole);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteUser);

module.exports = router;
