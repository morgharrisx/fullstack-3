import './App.css';
import Footer from './Footer/Footer';
import NavScrollExample from './Navbar/navbar';
import ControlledCarousel from './Carousel/ControlledCarousel';
import BentoGrid from './BentoGrid/BentoGrid';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <NavScrollExample/>
      <ControlledCarousel />
      <BentoGrid />
      <Dashboard />
      <Footer/>
    </div>
  );
}

export default App;
