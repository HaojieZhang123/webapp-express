const express = require('express');
const router = express.Router();

// controllers
const moviesController = require('../controllers/moviesController');

// routes
router.get('/', moviesController.index);
router.get('/:id', moviesController.show);
router.post('/', moviesController.store);
router.put('/:id', moviesController.update);
router.patch('/:id', moviesController.modify);
router.delete('/:id', moviesController.destroy);

module.exports = router;