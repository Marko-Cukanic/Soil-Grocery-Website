import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Perform validations
    if (!formData.name || !formData.email || !formData.password) {
      // Handle required field validation
      return;
    }
    if (!isValidEmail(formData.email)) {
      // Handle invalid email format
      return;
    }
    if (!isStrongPassword(formData.password)) {
      // Handle strong passowrd validations
      setPasswordError('Password should be at least 8 characters long and contain at least one uppercase letter and one symbol.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      // Handles password matching
      setConfirmPasswordError('Passwords do not match.');
      return;
    }
  
    // Record date joined and add it to formData
    const currentDate = new Date().toISOString().slice(0, 10);
    const updatedFormData = {
      ...formData,
      dateJoined: currentDate
    };
  
    // Save user details to localStorage, including date joined
    localStorage.setItem('user', JSON.stringify(updatedFormData));
    setSuccessMessage('Registration successful! Logging you in');
    localStorage.setItem('isLoggedIn', 'true');
    // Redirect to login page after successful signup
    setTimeout(() => {
      navigate('/Profile');
      window.location.reload();
    }, 2000);
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Sign Up</div>
      </div>
      <br />
      <form onSubmit={handleSubmit} noValidate>
        <div className="inputContainer">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
            className="inputBox"
            required
          />
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="inputBox"
            required
          />
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="inputBox"
            required
            minLength={8}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleChange}
            className="inputBox"
            required
            minLength={8}
          />
          {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
        </div>
        <br />
        <div className="buttonContainer">
          <button className="inputButton" type="submit">Sign Up</button>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default Signup;

// Define function to check if email is in proper format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  // Define regular expressions for uppercase letters and symbols
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[\W_]/; // Matches non-word characters (symbols) and underscores
  
  // Check if the password meets the criteria
  return password.length >= 8 && uppercaseRegex.test(password) && symbolRegex.test(password);
}
