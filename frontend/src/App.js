import './App.css';
import NavScrollExample from './Navbar/navbar';
import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
import Footer from './Footer/Footer';
import ControlledCarousel from './Carousel/ControlledCarousel';
import BentoGrid from './BentoGrid/BentoGrid';
import Dashboard from './Dashboard/Dashboard';
import React from 'react';

function App() {
  return (
    <div className="App">
      <NavScrollExample />
      <PlaylistGenerator />
      <ControlledCarousel />
      <BentoGrid />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;

