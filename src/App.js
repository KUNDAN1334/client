import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SoilInput from './components/Inputs/SoilInput';
import CropInput from './components/Inputs/CropInput';
import WeatherInput from './components/Inputs/WeatherInput';
import Recommendation from './components/Recommendation/Recommendation';
import Experience from './components/Community/Experience';
import SchemeRecommendation from './components/Schemes/SchemeRecommendation';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound';
// eslint-disable-next-line no-unused-vars
import i18n from './i18n';

function AppContent() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    } else {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return (
    <Router>
      <div style={contentStyle}>
        <Navbar />
        <div style={contentStyle}>
          <h1>{t('appTitle')}</h1>
          <Suspense fallback={<div>{t('loading')}</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/soil-input" element={<PrivateRoute><SoilInput /></PrivateRoute>} />
              <Route path="/crop-input" element={<PrivateRoute><CropInput /></PrivateRoute>} />
              <Route path="/weather-input" element={<PrivateRoute><WeatherInput /></PrivateRoute>} />
              <Route path="/recommendation" element={<PrivateRoute><Recommendation /></PrivateRoute>} />
              <Route path="/community" element={<PrivateRoute><Experience /></PrivateRoute>} />
              <Route path="/schemes" element={<PrivateRoute><SchemeRecommendation /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AppContent />
        </Suspense>
      </LanguageProvider>
    </AuthProvider>
  );
}

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',

  width: '100%', // Full width for the content
  margin: '0', // Remove default margin
  maxWidth: 'none', // Disable the max-width constraint
};


export default App;
