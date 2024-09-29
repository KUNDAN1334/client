import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/profile');
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!profile) {
    return <div className="no-profile">No profile data found.</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Location:</strong> {profile.location || 'Not specified'}</p>
        <p><strong>Farm Size:</strong> {profile.farmSize ? `${profile.farmSize} acres` : 'Not specified'}</p>
        <p><strong>Preferred Crops:</strong> {profile.preferredCrops && profile.preferredCrops.length > 0 ? profile.preferredCrops.join(', ') : 'Not specified'}</p>
      </div>
      <button className="edit-profile-btn">Edit Profile</button>
    </div>
  );
};

export default Profile;
