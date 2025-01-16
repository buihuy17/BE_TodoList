const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, todoController.create);
router.get('/', authenticate, todoController.getAll);
router.put('/:id', authenticate, todoController.update);
router.delete('/:id', authenticate, todoController.delete);

module.exports = router;