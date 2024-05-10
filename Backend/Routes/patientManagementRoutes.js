const express = require('express');
const router = express.Router();
const Patient = require('../Models/Patient'); // Adjust the path to match your model location

// Fetch all Patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find(); // Use a different variable name to store the result
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new Patient
router.post('/', async (req, res) => {
    const { name, phone, barangay, city, address, facebookLink, notes } = req.body;
    const newPatient = new Patient({
        name,
        phone,
        barangay,
        city,
        address,
        facebookLink,
        notes
    });
    try {
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
