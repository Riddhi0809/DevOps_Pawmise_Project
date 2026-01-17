const Visit = require('../models/Visit');

exports.createVisit = async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json({ message: 'Visit scheduled successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error scheduling visit, please try again.' });
  }
};

exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find();
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: 'Error getting visits.' });
  }
};
