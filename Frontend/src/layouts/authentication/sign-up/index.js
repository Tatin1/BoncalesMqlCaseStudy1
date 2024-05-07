import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if email already exists in the database
      const existingUser = await axios.get(`http://localhost:3001/check-user/${email}`);
      
      if (existingUser.data.exists) {
        console.log("User already exists. Redirecting to sign-in page.");
        navigate("/authentication/sign-in");
      } else {
        // User does not exist, proceed with registration
        const newUser = { name, email, password, role };
        
        // Send registration data to backend API
        const response = await axios.post("http://localhost:3001/register", newUser);

        console.log("Registration successful:", response.data);

        // Redirect to sign-in page after successful registration
        navigate("/authentication/sign-in");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error (e.g., display error message)
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Book an appointment with our very own doctors."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register here
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </SoftBox>
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
            <SoftBox mb={2}>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="doctor">Doctor</option>
                <option value="user">User</option>
              </select>
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox
                checked={agreement}
                onChange={handleSetAgreement}
              />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
              >
                Sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
