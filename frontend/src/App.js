import './App.css';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import ControlledCarousel from './Carousel/ControlledCarousel';
import BentoGrid from './BentoGrid/BentoGrid';
import CardComponent from './Card/Card';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <NavScrollExample/>
      <ControlledCarousel />
      <CardComponent header='Header' title='Title' text='This is a random text'></CardComponent>
      <ReusableButton color= {'pink'} text='Test First Button'></ReusableButton>
      <BentoGrid />
      <div className="playlist">
        <br />
        <PlaylistItem 
          songName="Song Title 1"
          album="Album Name 1"
          artist="Artist Name 1"
          views="1223"
          runtime="3:45"
          albumCover={null}
        />
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
