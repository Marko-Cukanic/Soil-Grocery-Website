import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  // State to hold user data including health information
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    dietaryPreferences: '',
    healthGoals: '',
  });
  
  const [isSuccess, setIsSuccess] = useState(false); // State to track success
  const navigate = useNavigate();

  // Effect to retrieve user data from local storage when the component mounts
  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
    setUserData(userDataFromStorage);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert('Password and confirm password do not match');
      return;
    }
    localStorage.setItem('user', JSON.stringify(userData));
    setIsSuccess(true); 
    setTimeout(() => {
      navigate('/profile')
      setIsSuccess(false); 
    }, 700);
    
  };;

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  // Function to handle logout and account deletion
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    localStorage.setItem('isLoggedIn', 'false'); // Update login status
    alert('Your account has been deleted');
    navigate('/login'); // Redirect to the login page
    window.location.reload(); // Reload the page to reflect changes

  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Profile</h2>
      {isSuccess && <p style={{ color: 'green', textAlign: 'center' }}>Changes saved successfully! Redirecting you back</p>}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px' }}>
        {/* Name */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Email */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Password */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Confirm Password */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Age */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={userData.age}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Weight */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="weight">Weight: (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={userData.weight}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Height */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="height">Height: (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={userData.height}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Activity Level */}
        <div style={{ marginTop: '20px' }}>
            <label htmlFor="activityLevel">Activity Level:</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={userData.activityLevel}
              onChange={handleChange}
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
        </div>
        {/* Dietary Preferences */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
          <input
            type="text"
            id="dietaryPreferences"
            name="dietaryPreferences"
            value={userData.dietaryPreferences}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Health Goals */}
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="healthGoals">Health Goals:</label>
          <input
            type="text"
            id="healthGoals"
            name="healthGoals"
            value={userData.healthGoals}
            onChange={handleChange}
            style={{ marginLeft: '20px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        {/* Save Changes and Logout buttons */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              marginLeft: '20px',
            }}
          >
            Logout and Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}
