import React, { useState } from 'react';
import api from '../../utils/api';
import './CropInput.css'; // Add a separate CSS file for styling

const CropInput = () => {
  const [cropData, setCropData] = useState({
    name: '',
    growthStage: '',
    plantingDate: '',
    expectedHarvestDate: '',
  });

  const handleChange = (e) => {
    setCropData({ ...cropData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/crop', cropData);
      alert('Crop data submitted successfully!');
      setCropData({
        name: '',
        growthStage: '',
        plantingDate: '',
        expectedHarvestDate: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit crop data. Please try again.');
    }
  };

  return (
    <div className="crop-input-container">
      <div className="crop-input-box">
        <h2>Enter Crop Data</h2>
        <form onSubmit={handleSubmit} className="crop-input-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Crop Name"
              value={cropData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="growthStage"
              placeholder="Growth Stage"
              value={cropData.growthStage}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="plantingDate"
              placeholder="Planting Date"
              value={cropData.plantingDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="expectedHarvestDate"
              placeholder="Expected Harvest Date"
              value={cropData.expectedHarvestDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Submit Crop Data</button>
        </form>
      </div>
    </div>
  );
};

export default CropInput;
