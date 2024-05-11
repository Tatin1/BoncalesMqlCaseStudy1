import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import axios from 'axios';
import curved9 from 'assets/images/curved-images/curved-6.jpg';

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      console.log('Login response:', response.data); // Log the response for debugging

      // Assuming successful authentication
      localStorage.setItem('token', response.data.token); // Store token in local storage
      navigate('/admin/index'); // Navigate to the admin dashboard after successful login
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging

      alert('Invalid credentials'); // Display error message for failed login
    }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <Card>
        <Box p={3} mb={1} textAlign="center">
          <Typography variant="h5" fontWeight="medium">
            Sign in with credentials
          </Typography>
        </Box>
        <Box pt={2} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center" mb={2}>
              <Checkbox
                checked={rememberMe}
                onChange={handleSetRememberMe}
              />
              <Typography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none' }}
              >
                &nbsp;&nbsp;Remember me
              </Typography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign in
              </Button>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <Typography variant="body2">
                Don&apos;t have an account?&nbsp;
                <Link to="/authentication/sign-up" style={{ fontWeight: 'bold' }}>
                  Sign up
                </Link>
              </Typography>
            </SoftBox>
          </form>
        </Box>
      </Card>
    </CoverLayout>
  );
};

export default SignIn;
