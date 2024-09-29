import React, { useState } from 'react';
import api from '../../utils/api';
import './SoilInput.css'; // Add a separate CSS file for styling

const SoilInput = () => {
  const [soilData, setSoilData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    moisture: '',
  });

  const handleChange = (e) => {
    setSoilData({ ...soilData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/soil', soilData);
      alert('Soil data submitted successfully!');
      setSoilData({
        pH: '',
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        organicMatter: '',
        moisture: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit soil data. Please try again.');
    }
  };

  return (
    <div className="soil-input-container">
      <div className="soil-input-box">
        <h2>Enter Soil Data</h2>
        <form onSubmit={handleSubmit} className="soil-input-form">
          <div className="form-group">
            <input
              type="number"
              name="pH"
              placeholder="pH"
              value={soilData.pH}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="nitrogen"
              placeholder="Nitrogen (ppm)"
              value={soilData.nitrogen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="phosphorus"
              placeholder="Phosphorus (ppm)"
              value={soilData.phosphorus}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="potassium"
              placeholder="Potassium (ppm)"
              value={soilData.potassium}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="organicMatter"
              placeholder="Organic Matter (%)"
              value={soilData.organicMatter}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="moisture"
              placeholder="Moisture (%)"
              value={soilData.moisture}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Submit Soil Data</button>
        </form>
      </div>
    </div>
  );
};

export default SoilInput;
