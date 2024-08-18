import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavScrollExample from './Navbar/navbar';
import ControlledCarousel from './Carousel/ControlledCarousel';
import DetailedStats from './DetailedStats/DetailedStats';
import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
import Footer from './Footer/Footer';
import Dashboard from './Dashboard/Dashboard';
import RecommendedPlaylist from './RecommendedPlaylist'; 
import Profile from './Profile/Profile';
import ContactForm from './ContactForm/ContactForm';
import Authentication from './login/login';

function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Router>
        <NavScrollExample isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <ControlledCarousel isLoggedIn={isLoggedIn} />
              <Footer />
            </>
          } />

          <Route path="/contact" element={
            <>
              <ContactForm />
              <Footer />
            </>
          } />

          {/* Authentication Route */}
          <Route path="/login" element={
            <Authentication onLogin={handleLogin} />
          } />
          
          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute element={<><Profile /><Footer /></>} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<><Dashboard /><Footer /></>} />} />
          <Route path="/detailed-stats" element={<ProtectedRoute element={<><DetailedStats /><Footer /></>} />} />
          <Route path="/dj-hub" element={<ProtectedRoute element={<><PlaylistGenerator /><Footer /></>} />} />
          <Route path="/smart-recommendations" element={<ProtectedRoute element={<><RecommendedPlaylist /><Footer /></>} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;