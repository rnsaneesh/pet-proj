const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    petId: mongoose.Schema.Types.ObjectId,
    petName:String,
    userName: String,
    status: { type: String, enum: ["Pending", "Accepted", "Denied"], default: "Pending" }
});



module.exports = mongoose.model('Requets', RequestSchema);