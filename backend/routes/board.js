const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// POST /api/board - Create a new boarding request
router.post('/', boardController.createBoard);

// GET /api/board - Get all boarding requests
router.get('/', boardController.getAllBoards);

module.exports = router;
