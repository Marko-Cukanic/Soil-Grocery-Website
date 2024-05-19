import React from 'react';
import '../Other.css';

export default function FarmingAdvice(){
  return(
    <div className="advicePage">
      <div className="overlay">
        <div className="adviceContainer">
          <div className="adviceItem">
            <div className="adviceContent">
              <h2>Use Organic Fertilizers</h2>
              <p>Organic fertilizers improve soil structure and enhance nutrient content, leading to healthier crops.</p>
            </div>
          </div>
          <div className="adviceItem">
            <div className="adviceContent">
              <h2>Rotate Crops Regularly</h2>
              <p>Rotating crops prevents soil depletion and reduces the risk of pests and diseases.</p>
            </div>
          </div>
          <div className="adviceItem">
            <div className="adviceContent">
              <h2>Implement Drip Irrigation</h2>
              <p>Drip irrigation conserves water by delivering it directly to the roots of plants, minimizing waste.</p>
            </div>
          </div>
          <div className="adviceItem">
            <div className="adviceContent">
              <h2>Practice Companion Planting</h2>
              <p>Companion planting promotes natural pest control and improves soil fertility through symbiotic relationships between plants.</p>
            </div>
          </div>
          <div className="adviceItem">
            <div className="adviceContent">
              <h2>Soil preparation</h2>
              <p> Ploughing is the process of loosening and digging of soil using a plough. This helps in proper aeration of the soil. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}