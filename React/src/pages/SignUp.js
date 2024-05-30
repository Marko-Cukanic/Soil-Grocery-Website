import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Perform validations
    if (!formData.name || !formData.email || !formData.password) {
      setApiError('All fields are required.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setApiError('Invalid email format.');
      return;
    }
    if (!isStrongPassword(formData.password)) {
      setPasswordError('Password should be at least 8 characters long and contain at least one uppercase letter and one symbol.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/Users', { 
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data && response.data.id) {
        const id = response.data.id;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('id', id);
        setSuccessMessage('Registration successful! Logging you in');
        setTimeout(() => {
          navigate('/Profile');
          window.location.reload();
        }, 2000);
      } else {
        setApiError('Invalid response from server');
      }
    } catch (error) {
      if (error.response && error.response.data.message === 'Email already exists') {
        setApiError('Email already exists. Please use a different email.');
      } else {
        setApiError('An error occurred during registration. Please try again.');
      }
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
    }
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
      {apiError && <p className="error">{apiError}</p>}
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
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[\W_]/; // Matches non-word characters (symbols) and underscores
  return password.length >= 8 && uppercaseRegex.test(password) && symbolRegex.test(password);
}
