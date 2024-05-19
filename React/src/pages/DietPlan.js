import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
//doesn't work
const API_KEY = 'fc9432220fmsh54a76d9a1cf1510p18c19fjsnc618d7d74b24';
const API_ENDPOINT = 'https://nutrition-calculator.p.rapidapi.com/api/nutrition-info';

function DietPlan() {
  const [dietPlanData, setDietPlanData] = useState({
    currentWeight: 0,
    goalWeight: 0,
    goals: '', 
    dailyCalories: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      setDietPlanData((prevData) => ({
        ...prevData,
        currentWeight: userData.weight || 0,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDietPlanData({ ...dietPlanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const { age, height, weight, activityLevel, gender } = userData;
  
      const weightInPounds = weight * 2.20462;
      const heightInFeet = height * 0.0328084;
      const feet = Math.floor(heightInFeet);
      const inches = Math.round((heightInFeet - feet) * 12);
  
      const response = await axios.request({
        method: 'GET',
        url: API_ENDPOINT,
        params: {
          measurement_units: 'std',
          sex: gender.toLowerCase(), // Set the gender dynamically
          age_value: age,
          age_type: 'yrs',
          feet: feet,
          inches: inches,
          lbs: weightInPounds,
          activity_level: activityLevel,
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'nutrition-calculator.p.rapidapi.com',
        },
      });
  
      const data = response.data; // Extract the response data
      console.log(data);
  
      // Navigate to DietPlanDetails and pass the data as props
      navigate('/DietPlanDetails', { state: { dietPlanData: data } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Your Diet Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label>
            Current Weight: {dietPlanData.currentWeight} kg
          </label>
          <label>
            Goal:
            <input
              type="text"
              name="goals"
              value={dietPlanData.goals}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="inputContainer">
          <label>
            Current Daily Calories consumption:
            <input
              type="number"
              name="dailyCalories"
              value={dietPlanData.dailyCalories}
              onChange={handleInputChange}
            />
          </label>
        </div>
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
              marginRight: '10px',
            }}
          >
            Currently N/A
          </button>
        </div>
      </form>
    </div>
  );
}

export default DietPlan;
