import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './SchemeRecommendation.css'; // Import the CSS file for styling

const SchemeRecommendation = () => {
  const [schemes, setSchemes] = useState([]);
  const [userInfo, setUserInfo] = useState({
    cropType: '',
    landSize: '',
    income: '',
  });

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await api.get('/api/schemes');
        setSchemes(res.data);
      } catch (err) {
        console.error('Failed to fetch schemes:', err);
      }
    };
    fetchSchemes();
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/schemes/recommend', userInfo);
      setSchemes(res.data);
    } catch (err) {
      console.error('Failed to get scheme recommendations:', err);
    }
  };

  return (
    <div className="scheme-recommendation-container">
      <h2>Government Scheme Recommendations</h2>
      <form onSubmit={handleSubmit} className="scheme-form">
        <div className="form-group">
          <input
            type="text"
            name="cropType"
            placeholder="Crop Type"
            value={userInfo.cropType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="landSize"
            placeholder="Land Size (in acres)"
            value={userInfo.landSize}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="income"
            placeholder="Annual Income"
            value={userInfo.income}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Get Recommendations</button>
      </form>

      <div className="schemes-list">
        {schemes.length > 0 ? (
          schemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card">
              <h3>{scheme.name}</h3>
              <p>{scheme.description}</p>
              <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p><strong>Benefits:</strong> {scheme.benefits}</p>
            </div>
          ))
        ) : (
          <p>No schemes found. Please fill in the information to get recommendations.</p>
        )}
      </div>
    </div>
  );
};

export default SchemeRecommendation;
