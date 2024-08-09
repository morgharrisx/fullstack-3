import './App.css';
import CardComponent from './Card/Card';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <NavScrollExample/>
      <CardComponent header='Header' title='Title' text='This is a random text'></CardComponent>
      <ReusableButton text='Test First Button'></ReusableButton>
      <div className="playlist">
        <br></br>
        <PlaylistItem 
          songName="Song Title 1"
          album="Album Name 1"
          artist="Artist Name 1"
          views="1223"
          runtime="3:45"
          albumCover={null} // to be replaced with actual album cover url
        />
      </div>
      <Dashboard>
      </Dashboard>
    </div>
  );
}

export default App;
