const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  petName: String,
  name: String,
  address: String,
  city: String,
  phone: String,
  when: Date,
});

module.exports = mongoose.model('Visit', visitSchema);
