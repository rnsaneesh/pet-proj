// models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  OrgName: { type: String, required: true },
  additionalInfo: { type: String },
});

module.exports = mongoose.model('Pet', petSchema);
