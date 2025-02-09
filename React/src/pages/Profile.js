import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }

    if (id) {
      axios.get(`http://localhost:3000/api/Users/${id}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleEdit = () => {
    navigate('/EditProfile');
  };

  const handleSignOut = () => {
    localStorage.removeItem('id');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/Login');
    window.location.reload();
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const formattedDateJoined = new Date(userData.dateJoined).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      {isLoggedIn ? (
        <div style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Profile</h2>
          <p style={{ textAlign: 'center' }}>Successfully Logged In</p>
          {userData && (
            <div style={{ marginTop: '20px' }}>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Date Joined:</strong> {formattedDateJoined}</p>
              {userData.gender && <p><strong>Gender:</strong> {userData.gender}</p>}
              {userData.age && <p><strong>Age:</strong> {userData.age}</p>}
              {userData.weight && <p><strong>Weight:</strong> {userData.weight}</p>}
              {userData.height && <p><strong>Height:</strong> {userData.height}</p>}
              {userData.activityLevel && <p><strong>Activity Level:</strong> {userData.activityLevel}</p>}
              {userData.dietaryPreferences && <p><strong>Dietary Preferences:</strong> {userData.dietaryPreferences}</p>}
              {userData.healthGoals && <p><strong>Health Goals:</strong> {userData.healthGoals}</p>}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
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
                marginRight: '10px'
              }}
              onClick={handleEdit}
            >
              Edit Profile
            </button>
            <button
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
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>User not logged in. Please log in using the navbar.</p>
      )}
    </div>
  );
}
