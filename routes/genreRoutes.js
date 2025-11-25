const { Router } = require('express');
const {
  getGenres,
  postGenre,
  putGenre,
  deleteGenre,
} = require('../controllers/genreController.js');

const { authenticate } = require('../middleware/authenticate.js');
const { authorizeRoles } = require('../middleware/authorizeRoles.js');

const router = Router();

// GET /genres
router.get('/', getGenres);

// POST /genres
router.post('/', authenticate, authorizeRoles('ADMIN'), postGenre);

// PUT /genres/:id
router.put('/:id', authenticate, authorizeRoles('ADMIN'), putGenre);

// DELETE /genres/:id
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteGenre);

module.exports = router;
