import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExampleRecommendation = async () => {
      try {
        const res = await api.getExampleRecommendation();
        console.log('API response:', res.data); // Log the response
        setRecommendation(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching example recommendation:', err);
        setError(err.message || 'An error occurred while fetching the recommendation.');
        setLoading(false);
      }
    };
    fetchExampleRecommendation();
  }, []);

  if (loading) return <div>Loading recommendation...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recommendation) return <div>No recommendation available.</div>;

  return (
    <div className="recommendation">
      <h2>Example Recommendation for {recommendation.crop}</h2>
      {recommendation.soil && (
        <div>
          <h3>Soil</h3>
          <p>Type: {recommendation.soil.type}</p>
          <p>pH: {recommendation.soil.pH}</p>
        </div>
      )}
      {recommendation.weather && (
        <div>
          <h3>Weather</h3>
          <p>Temperature: {recommendation.weather.temperature}°C</p>
          <p>Rainfall: {recommendation.weather.rainfall}mm</p>
        </div>
      )}
      {recommendation.fertilizer && (
        <div>
          <h3>Fertilizer</h3>
          <p>Type: {recommendation.fertilizer.type}</p>
          <p>Amount: {recommendation.fertilizer.amount}</p>
          <p>Application: {recommendation.fertilizer.application}</p>
        </div>
      )}
      {recommendation.irrigation && (
        <div>
          <h3>Irrigation</h3>
          <p>Method: {recommendation.irrigation.method}</p>
          <p>Frequency: {recommendation.irrigation.frequency}</p>
        </div>
      )}
      {recommendation.calendar && recommendation.calendar.length > 0 && (
        <div>
          <h3>Calendar</h3>
          <ul>
            {recommendation.calendar.map((event, index) => (
              <li key={index}>{event.date}: {event.action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
