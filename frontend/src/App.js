import './App.css';
import CardComponent from './Card/Card';
import NavScrollExample from './Navbar/navbar';
import ReusableButton from './ReusableButton/ReusableButton';
import PlaylistItem from './PlaylistItem/PlaylistItem';

import React, { useEffect, useState } from 'react';

function App() {

    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
  
    useEffect(() => {
      // Check if there are tokens in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const access_token = urlParams.get('access_token');
      const refresh_token = urlParams.get('refresh_token');
  
      if (access_token) {
        setAccessToken(access_token);
        localStorage.setItem('access_token', access_token);
      }
  
      if (refresh_token) {
        setRefreshToken(refresh_token);
        localStorage.setItem('refresh_token', refresh_token);
      }
    }, []);


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
    </div>
  );
}

export default App;
