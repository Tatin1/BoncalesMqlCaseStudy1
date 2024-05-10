const express = require('express');
const router = express.Router();
const Doctor = require('../Models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new doctor
router.post('/', async (req, res) => {
    const { name, services, availability } = req.body;
    const color = getRandomColor(); // Assign a random color

    const newDoctor = new Doctor({
        name,
        services,
        availability,
        color
    });

    try {
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a doctor
router.put('/:id', async (req, res) => {
    const { name, services, availability, color } = req.body;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, {
            name, services, availability, color
        }, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) return res.status(404).send("No Doctor found.");
        res.json({ message: "Doctor deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
