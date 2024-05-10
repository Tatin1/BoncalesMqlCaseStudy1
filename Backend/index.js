const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorsRoutes = require('./routes/doctorRoutes');
const patientManagementRoutes = require('./Routes/patientManagementRoutes');
const authRoutes = require('./Routes/authRoutes');
const userManagementRoute = require('./Routes/userManagementRoute');
const Appointment = require('./Models/Appointment');  // Assuming you have an Appointment model

const app = express();

// CORS configuration for development
// In production, you might want to restrict this to only certain origins
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this if your front-end is on a different port
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/CaseStudy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Authentication routes
app.use('/api/auth', authRoutes);
// Routes for handling API requests
app.use('/api/user-management', userManagementRoute);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patient-management', patientManagementRoutes);

// Handling 404 errors for unspecified routes
app.use((req, res) => {
    res.status(404).send('API endpoint does not exist');
});

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
