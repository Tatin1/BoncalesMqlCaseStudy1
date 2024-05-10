const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    barangay: String,
    city: { type: String, default: 'Iligan' },
    address: String,
    facebookLink: String,
    notes: String
});

module.exports = mongoose.model('Patient', patientSchema);
