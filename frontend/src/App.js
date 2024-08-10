import './App.css';
import CardComponent from './Card/Card';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import PlaylistItem from './PlaylistItem/PlaylistItem';

function App() {
  return (
    <div className="App">
      <NavScrollExample/>
      <CardComponent header='Header' title='Title' text='This is a random text'></CardComponent>
      <ReusableButton text='Test First Button'></ReusableButton>
      <div className="playlist">
        <br></br>
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
    </div>
  );
}

export default App;
