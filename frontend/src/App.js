import './App.css';
import NavScrollExample from './Navbar/navbar';
import ControlledCarousel from './Carousel/ControlledCarousel';
import DetailedStats from './DetailedStats/DetailedStats';


function App() {
  return (
    <div className="App">
      <NavScrollExample/>
      <ControlledCarousel />
      <DetailedStats />
    </div>
  );
}

export default App;
