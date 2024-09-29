import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Great Results with Balanced NPK",
      description: "I used a balanced NPK fertilizer on my tomato plants and saw amazing growth!",
      author: "GreenThumb123",
      date: "2023-05-15"
    },
    {
      id: 2,
      title: "Organic Fertilizer Success",
      description: "Switched to organic fertilizers this season. My garden has never looked better!",
      author: "OrganicGardener",
      date: "2023-05-10"
    }
  ]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('/api/experiences');
      setExperiences(prevExperiences => [...prevExperiences, ...response.data]);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  return (
    <div className="experience-container">
      <h2>Community Experiences</h2>
      {experiences.map((experience) => (
        <div key={experience.id} className="experience-card">
          <h3>{experience.title}</h3>
          <p>{experience.description}</p>
          <p>Author: {experience.author}</p>
          <p>Date: {new Date(experience.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Experience;
