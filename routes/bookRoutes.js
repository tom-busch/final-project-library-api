const { Router } = require('express');
const {
  getBooks,
  postBook,
  putBook,
  deleteBook,
} = require('../controllers/bookController.js');

const { authenticate } = require('../middleware/authenticate.js');
const { authorizeRoles } = require('../middleware/authorizeRoles.js');

const router = Router();

// GET /books
router.get('/', getBooks);

// POST /books
router.post('/', authenticate, authorizeRoles('ADMIN'), postBook);

// PUT /books/:id
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putBook);

// DELETE /books/:id
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteBook);

module.exports = router;
