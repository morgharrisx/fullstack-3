import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import NavScrollExample from './Navbar/navbar';
import ControlledCarousel from './Carousel/ControlledCarousel';
import DetailedStats from './DetailedStats/DetailedStats';
import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
import Footer from './Footer/Footer';
import Dashboard from './Dashboard/Dashboard';
import RecommendedPlaylist from './RecommendedPlaylist'; 
import Profile from './Profile/Profile';
import ContactForm from './ContactForm/ContactForm';
import LandingInfo from './LandingInfo/LandingInfo';
import Login from './login/login';

function App() { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('spotify_access_token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);
  

  return (
    <div className="App">
      <Router>
       <NavScrollExample isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<><ControlledCarousel/><LandingInfo/><Footer/> </>} />
          <Route path="/contact" element={<><ContactForm/><Footer/> </>} />
          {isLoggedIn ? (
            <>
              <Route path="/profile" element={<><Profile/><Footer/> </>} />
              <Route path="/dashboard" element={<><Dashboard/><Footer/> </>} />
              <Route path="/detailed-stats" element={<><DetailedStats/><Footer/> </>} />
              <Route path="/dj-hub" element={<><PlaylistGenerator/><Footer/> </>} />
              <Route path="/smart-recommendations" element={<><RecommendedPlaylist/><Footer/> </>} />
            </>
          ) : (
            <Route path="*" element={<Login/>} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
