import React from 'react';
import logo from '../assets/Black And White Aesthetic Minimalist Modern Simple Typography Coconut Cosmetics Logo.png';

const NotFound = () => {
  return (
    <div style={notFoundStyle}>
      <img src={logo} alt="Logo" style={imageStyle} />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

// Optional inline styles
const notFoundStyle = {
  textAlign: 'center',
  marginTop: '50px',
};

const imageStyle = {
  width: '500px' , // Adjust as needed
  height: "500px",
};

export default NotFound;
