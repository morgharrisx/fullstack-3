import React from 'react';
import PlaylistItem from '../../PlaylistItem/PlaylistItem';
import {Container } from 'react-bootstrap';
import './compatiblesongs.css'
import ReusableButton from '../../ReusableButton/ReusableButton'

const CompatibleSongs = ({compatibleSongsArray}) => {
    return (
      <Container className='compatible-songs-container'>
      <p className="lead">Most compatible songs</p>
      {compatibleSongsArray.map((song, index) => (
        <div className="playlist mb-3">
        <PlaylistItem
          key={index}
          songName={song.songName}
          album={song.album}
          artist={song.artist}
          views={song.views}
          runtime={song.runtime}
          albumCover={song.albumCover}
        />
        </div>
      ))}
      <ReusableButton color={'pink'} text={'See more'}></ReusableButton>
    </Container>
    );
  };
  
  export default CompatibleSongs;

