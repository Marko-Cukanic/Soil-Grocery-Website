import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setApiError('');

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });

      console.log(response.data); // Log the entire response for debugging

      if (response.data && response.data.user && response.data.user.name) {
        console.log(`Welcome ${response.data.user.name}`);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/profile');
        window.location.reload();
      } else {
        setApiError('Invalid response from server');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setApiError('Invalid credentials');
        } else {
          setApiError('An error occurred. Please try again.');
        }
      } else {
        setApiError('An error occurred. Please try again.');
      }
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <br />
      <form noValidate>
        <div className="inputContainer">
          <input
            type="email"
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
            required
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
            required
            minLength={8}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        {apiError && <div className="errorLabel">{apiError}</div>}
        <div className="inputContainer">
          <div className="buttonGroup">
            <button className="inputButton" onClick={onButtonClick}>
              Log in
            </button>
            <button className="inputButton" onClick={goToSignUp}>
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
