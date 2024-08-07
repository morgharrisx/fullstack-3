import './App.css';
import ReusableButton from './ReusableButton/ReusableButton';
import PlaylistItem from './PlaylistItem/PlaylistItem';


function App() {
  return (
    <div className="App">
      <ReusableButton text='Test First Button'></ReusableButton>
      <div className="playlist">
        <br></br>
      <PlaylistItem 
        songName="Song Title 1"
        album="Album Name 1"
        views="1223"
        runtime="3:45"
      />
      </div>
    </div>
  );
}

export default App;