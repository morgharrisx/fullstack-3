import './App.css';
import NavScrollExample from './Navbar/navbar';
import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
import Footer from './Footer/Footer';
import ControlledCarousel from './Carousel/ControlledCarousel';
import BentoGrid from './BentoGrid/BentoGrid';
import Dashboard from './Dashboard/Dashboard';
import React from 'react';
import Profile from './Profile/Profile';
import ContactForm from './ContactForm/ContactForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
       <Route path="/" element={<>  <NavScrollExample/><ControlledCarousel/><Footer/>  </>} />
        <Route path="/profile" element={<>  <NavScrollExample/><Profile/><Footer/>  </>} />
        <Route path="/stats" element={<>   <NavScrollExample/><Dashboard/><Footer/> </>} />
        <Route path="/detailed-stats" element={<>  <NavScrollExample/><BentoGrid/><Footer/>  </>} />
        <Route path="/dj-hub" element={<>  <NavScrollExample/><PlaylistGenerator/><Footer/>  </>} />
        <Route path="/contact" element={<>  <NavScrollExample/><ContactForm/><Footer/>  </>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

