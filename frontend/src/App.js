import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavScrollExample from './Navbar/navbar';
import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
import Footer from './Footer/Footer';
import ControlledCarousel from './Carousel/ControlledCarousel';
// import BentoGrid from './BentoGrid/BentoGrid';
// import CardComponent from './Card/Card';
import Dashboard from './Dashboard/Dashboard';
import RecommendedPlaylist from './RecommendedPlaylist'; // Import the RecommendedPlaylist component
import DetailedStats from './DetailedStats/DetailedStats';
import Profile from './Profile/Profile';
import ContactForm from './ContactForm/ContactForm';

function App() { 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<> <NavScrollExample/><ControlledCarousel/><Footer/> </>} />
          <Route path="/profile" element={<> <NavScrollExample/><Profile/><Footer/> </>} />
          <Route path="/stats" element={<> <NavScrollExample/><Dashboard/><Footer/> </>} />
          <Route path="/detailed-stats" element={<> <NavScrollExample/><DetailedStats/><Footer/> </>} />
          <Route path="/dj-hub" element={<> <NavScrollExample/><PlaylistGenerator/><Footer/> </>} />
          <Route path="/contact" element={<> <NavScrollExample/><ContactForm/><Footer/> </>} />
          <Route path="/recommended" element={<> <NavScrollExample/><RecommendedPlaylist/><Footer/> </>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

