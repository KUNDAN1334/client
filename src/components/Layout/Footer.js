import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about'); // Redirect to the /about page
  };

  return (
    <footer className="footer" style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h4 onClick={handleAboutClick} style={clickableStyle}>About Us</h4>
        </div>
        <div style={sectionStyle}>
          <h4>Contact Us</h4>
        </div>
        <div style={sectionStyle}>
          <h4>Powered by Flankers</h4>
        </div>
      </div>
      <p style={copyrightStyle}>
        &copy; 2023 Fertilizer Optimizer. All rights reserved.
      </p>
    </footer>
  );
};

// Inline styles
const footerStyle = {
  backgroundColor: '#282c34',
  color: '#fff',
  padding: '30px 20px',
  textAlign: 'center',
  borderTop: '2px solid #444',
  fontSize: '16px',
  position: 'relative',
  bottom: '0',
  width: '100%',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const sectionStyle = {
  flex: '1',
  minWidth: '150px',
  marginBottom: '15px',
};

const clickableStyle = {
  cursor: 'pointer',
  textDecoration: 'underline',
};

const copyrightStyle = {
  marginTop: '20px',
  fontSize: '14px',
  color: '#aaa',
};

export default Footer;
