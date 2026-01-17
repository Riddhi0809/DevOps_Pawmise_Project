const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  petName: String,
  species: String,
  ownerName: String,
  ownerContact: String,
  vaccinationHistory: String,
  imageUrl: String,
  boardFrom: Date,      // New field for board start date
  boardTill: Date,      // New field for board end date
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Board', boardSchema);
