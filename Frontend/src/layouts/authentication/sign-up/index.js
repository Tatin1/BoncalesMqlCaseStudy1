import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import axios from 'axios';
import curved6 from 'assets/images/curved-images/curved14.jpg';

const SignUp = () => {
  const [agreement, setAgreement] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existingUser = await axios.get(`http://localhost:3001/Users/${email}`);

      if (existingUser.data.exists) {
        console.log('User already exists. Redirecting to sign-in page.');
        navigate('/authentication/sign-in');
      } else {
        const newUser = { name, email, password, role };
        const response = await axios.post('http://localhost:3001/Users', newUser);

        console.log('Registration successful:', response.data);
        navigate('/authentication/sign-in');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (e.g., display error message)
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Book an appointment with our very own Doctors."
      image={curved6}
    >
      <Card>
        <Box p={3} mb={1} textAlign="center">
          <Typography variant="h5" fontWeight="medium">
            Register here
          </Typography>
        </Box>
        <Box pt={2} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              />
            </Box>
            <Box mb={2}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              />
            </Box>
            <Box mb={2}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              />
            </Box>
            <Box mb={2}>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                fullWidth
                displayEmpty
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Checkbox
                checked={agreement}
                onChange={handleSetAgreement}
              />
              <Typography
                variant="body2"
                onClick={handleSetAgreement}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              >
                I agree to the&nbsp;
                <Link to="#" style={{ fontWeight: 'bold' }}>
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>
            <Box mt={4} mb={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign up
              </Button>
            </Box>
            <Box mt={3} textAlign="center">
              <Typography variant="body2">
                Already have an account?&nbsp;
                <Link to="/authentication/sign-in" style={{ fontWeight: 'bold' }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Card>
    </BasicLayout>
  );
};

export default SignUp;
