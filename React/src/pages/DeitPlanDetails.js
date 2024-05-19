import React from 'react';
import { useLocation } from 'react-router-dom';

//Not fully 
const DietPlanDetails = () => {
  const location = useLocation();
  const { dietPlanData } = location.state;

  if (!dietPlanData || !dietPlanData.BMI_EER || !dietPlanData.BMI_EER.BMI) {
    return <div>Error: BMI data not available</div>;
  }

  return (
    <div>
      <h1>Diet Plan Details</h1>
      
      {/* Display BMI and Estimated Daily Caloric Needs */}
      <h2>BMI and Estimated Daily Caloric Needs</h2>
      <p>BMI: {dietPlanData.BMI_EER.BMI}</p>
      <p>Estimated Daily Caloric Needs: {dietPlanData.BMI_EER['Estimated Daily Caloric Needs']}</p>
      
      {/* Display Macronutrients */}
      <h2>Macronutrients</h2>
      <ul>
        {dietPlanData.macronutrients_table['macronutrients-table'].map((nutrient, index) => (
          <li key={index}>{nutrient}</li>
        ))}
      </ul>
      
      {/* Display Minerals */}
      <h2>Minerals</h2>
      <ul>
        {dietPlanData.minerals_table['essential-minerals-table'].map((mineral, index) => (
          <li key={index}>{mineral}</li>
        ))}
      </ul>
      
      {/* Display Non-Essential Minerals */}
      <h2>Non-Essential Minerals</h2>
      <ul>
        {dietPlanData.non_essential_minerals_table['non-essential-minerals-table'].map((mineral, index) => (
          <li key={index}>{mineral}</li>
        ))}
      </ul>
      
      {/* Display Vitamins */}
      <h2>Vitamins</h2>
      <ul>
        {dietPlanData.vitamins_table['vitamins-table'].map((vitamin, index) => (
          <li key={index}>{vitamin}</li>
        ))}
      </ul>
    </div>
  );
};

export default DietPlanDetails;
