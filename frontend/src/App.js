import './App.css';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import ControlledCarousel from './Carousel/ControlledCarousel';
import BentoGrid from './BentoGrid/BentoGrid';
import CardComponent from './Card/Card';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import Dashboard from './Dashboard/Dashboard';
import RecommendedSongs from './RecommendedSongs/RecommendedSongs';

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
          songName="Please Please Please"
          album="Short n' Sweet"
          artist="Sabrina Carpenter"
          views="503,795,279"
          runtime="3:06"
          albumCover="https://upload.wikimedia.org/wikipedia/en/f/fd/Short_n%27_Sweet_-_Sabrina_Carpenter.png"
        />
        <PlaylistItem 
          songName="CHIHIRO"
          album="HIT ME HARD AND SOFT"
          artist="Billie Eilish"
          views="334,149,206"
          runtime="5:00"
          albumCover="https://upload.wikimedia.org/wikipedia/en/a/aa/Billie_Eilish_-_Hit_Me_Hard_and_Soft.png"
        />
      </div>
      <Dashboard />
      <RecommendedSongs />
    </div>
  );
}

export default App;
