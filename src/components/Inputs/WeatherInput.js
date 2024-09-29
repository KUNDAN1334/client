import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './WeatherInput.css'; // Include the CSS file for styling

const WeatherInput = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: '',
    humidity: '',
    rainfall: '',
    windSpeed: '',
    date: '',
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const position = await getCurrentPosition();
        const res = await api.get(`/api/weather/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        setWeatherData(res.data);
      } catch (err) {
        console.error('Failed to fetch weather data automatically:', err);
      }
    };
    fetchWeatherData();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleChange = (e) => {
    setWeatherData({ ...weatherData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/weather', weatherData);
      alert('Weather data submitted successfully!');
      setWeatherData({
        temperature: '',
        humidity: '',
        rainfall: '',
        windSpeed: '',
        date: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit weather data. Please try again.');
    }
  };

  return (
    <div className="weather-input-container">
      <div className="weather-input-box">
        <h2>Weather Data</h2>
        <form onSubmit={handleSubmit} className="weather-input-form">
          <div className="form-group">
            <input
              type="number"
              name="temperature"
              placeholder="Temperature (°C)"
              value={weatherData.temperature}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="humidity"
              placeholder="Humidity (%)"
              value={weatherData.humidity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="rainfall"
              placeholder="Rainfall (mm)"
              value={weatherData.rainfall}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="windSpeed"
              placeholder="Wind Speed (km/h)"
              value={weatherData.windSpeed}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              value={weatherData.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Submit Weather Data</button>
        </form>
      </div>
    </div>
  );
};

export default WeatherInput;
