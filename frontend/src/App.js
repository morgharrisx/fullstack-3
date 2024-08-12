import './App.css';
import NavScrollExample from './Navbar/navbar';
import ControlledCarousel from './Carousel/ControlledCarousel';
import BentoGrid from './BentoGrid/BentoGrid';


function App() {
  return (
    <div className="App">
      <NavScrollExample/>
      <ControlledCarousel />
      <BentoGrid />
    </div>
  );
}

export default App;
