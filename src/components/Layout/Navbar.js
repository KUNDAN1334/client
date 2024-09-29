import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const logoStyle = {
    width: '80px',
    height: '80px',
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="My Logo" style={logoStyle} />
      </Link>

      <div className="navbar-menu">
        {user ? (
          <>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/community">Community</Link>
            <Link className="nav-link" to="/schemes">Schemes</Link>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
