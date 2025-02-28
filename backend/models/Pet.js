// models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  Petname: String,
  breed: String,
  age: String,
  orgName: String,
  description: String,
  
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Pet', petSchema);
