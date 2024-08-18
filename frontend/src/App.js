import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavScrollExample from './Navbar/navbar';
import ControlledCarousel from './Carousel/ControlledCarousel';
import DetailedStats from './DetailedStats/DetailedStats';
import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
import Footer from './Footer/Footer';
import Dashboard from './Dashboard/Dashboard';
import RecommendedPlaylist from './RecommendedPlaylist'; 
import Profile from './Profile/Profile';
import ContactForm from './ContactForm/ContactForm';

function App() { 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<> <NavScrollExample/><ControlledCarousel/><Footer/> </>} />
          <Route path="/profile" element={<> <NavScrollExample/><Profile/><Footer/> </>} />
          <Route path="/dashboard" element={<> <NavScrollExample/><Dashboard/><Footer/> </>} />
          <Route path="/detailed-stats" element={<> <NavScrollExample/><DetailedStats/><Footer/> </>} />
          <Route path="/dj-hub" element={<> <NavScrollExample/><PlaylistGenerator/><Footer/> </>} />
          <Route path="/contact" element={<> <NavScrollExample/><ContactForm/><Footer/> </>} />
          <Route path="/smart-recommendations" element={<> <NavScrollExample/><RecommendedPlaylist/><Footer/> </>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

