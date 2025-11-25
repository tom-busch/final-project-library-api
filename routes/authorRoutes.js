const { Router } = require('express');
const {
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
} = require('../controllers/authorController.js');

const { authenticate } = require('../middleware/authenticate.js');
const { authorizeRoles } = require('../middleware/authorizeRoles.js');

const router = Router();

router.get('/', getAuthors);
router.post('/', authenticate, authorizeRoles('ADMIN'), postAuthor);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putAuthor);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteAuthor);

module.exports = router;
