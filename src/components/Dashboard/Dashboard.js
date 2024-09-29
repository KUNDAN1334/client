import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.get('/api/recommendation');
        setRecommendations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecommendations();
  }, []);

  const dashboardOptions = [
    { title: t('soilInput'), link: '/soil-input' },
    { title: t('cropInput'), link: '/crop-input' },
    { title: t('weatherInput'), link: '/weather-input' },
    { title: t('recommendation'), link: '/recommendation' },
  ];

  return (
    <div className="dashboard">
      <h1 className="welcome-message">{t('welcomeMessage', { name: user.name })}</h1>

      <div className="dashboard-options">
        {dashboardOptions.map((option, index) => (
          <DashboardCard key={index} title={option.title} link={option.link} />
        ))}
      </div>

      <div className="recommendation-section">
        <h2>{t('recentRecommendations')}</h2>
        <ul className="recommendation-list">
          {recommendations.length > 0 ? (
            recommendations.map((rec) => (
              <li key={rec._id} className="recommendation-item">
                <strong>{t('crop', { name: rec.cropName })}:</strong> {rec.fertilizerType} - {rec.fertilizerQuantity} {t('kgPerHectare')}
              </li>
            ))
          ) : (
            <p>{t('noRecommendations')}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, link }) => {
  return (
    <Link to={link} className="dashboard-card">
      <h2>{title}</h2>
    </Link>
  );
};

export default Dashboard;
