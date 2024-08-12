import './App.css';
import React from 'react';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import ControlledCarousel from './Carousel/ControlledCarousel';
import BentoGrid from './BentoGrid/BentoGrid';
import CardComponent from './Card/Card';
import Dashboard from './Dashboard/Dashboard';
import RecommendedPlaylist from './RecommendedPlaylist'; // Import the RecommendedPlaylist component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() { // Create a Home component to render your main page layout
  return (
    <div className="App">
      <NavScrollExample/>
      <ControlledCarousel />
      <CardComponent header='Header' title='Title' text='This is a random text'></CardComponent>
      <ReusableButton color={'pink'} text='Test First Button'></ReusableButton>
      <BentoGrid />
      <Dashboard />
      {/* <RecommendedSongs /> */}
    </div>
  );
}

function Recommended() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recommended" element={<RecommendedPlaylist />} />
      </Routes>
    </Router>
  );
}

export default Recommended;