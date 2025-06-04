const express = require('express');
const router = express.Router();

// multer
const upload = require('../middlewares/multer');

// controllers
const moviesController = require('../controllers/moviesController');

// routes
router.get('/', moviesController.index);
router.get('/:id', moviesController.show);
router.post('/', upload.single('image'), moviesController.store);
router.put('/:id', moviesController.update);
router.patch('/:id', moviesController.modify);
router.delete('/:id', moviesController.destroy);

module.exports = router;