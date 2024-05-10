const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    services: [String],
    availability: {
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String],
        sunday: [String]
    },
    color: { type: String, required: true } // Color code for the doctor
});

module.exports = mongoose.model('Doctor', doctorSchema);
