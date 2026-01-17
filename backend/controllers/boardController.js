const Board = require('../models/Board');

exports.createBoard = async (req, res) => {
  try {
    const board = new Board(req.body);
    await board.save();
    res.status(201).json({ message: 'Boarding request submitted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting boarding request.' });
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Error getting boarding requests.' });
  }
};
