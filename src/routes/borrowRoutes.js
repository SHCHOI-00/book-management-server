const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', borrowController.borrowBook);
router.delete('/:id', borrowController.returnBook);
router.get('/', borrowController.getBorrows);
router.put('/:id/return', borrowController.returnBook);

module.exports = router;
