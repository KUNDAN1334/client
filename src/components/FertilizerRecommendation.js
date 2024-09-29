import React, { useState } from 'react';
import axios from 'axios';

const FertilizerRecommendation = () => {
  const [soilInput, setSoilInput] = useState({});
  const [cropInput, setCropInput] = useState({});
  const [weatherInput, setWeatherInput] = useState({});
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/fertilizer/recommend', {
        soilInput,
        cropInput,
        weatherInput
      });
      setRecommendation(response.data.recommendation.fertilizer_recommendation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for soil, crop, and weather data */}
        <button type="submit">Get Recommendation</button>
      </form>
      {recommendation && <p>Recommended fertilizer: {recommendation}</p>}
    </div>
  );
};

export default FertilizerRecommendation;
