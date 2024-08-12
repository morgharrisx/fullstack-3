import React from 'react';
import PlaylistItem from '../../PlaylistItem/PlaylistItem';
import {Container } from 'react-bootstrap';
import './compatiblesongs.css'

const CompatibleSongs = ({compatibleSongsArray}) => {
    return (
      <Container className='compatible-songs-container'>
      <p className="lead">Most compatible songs</p>
      {compatibleSongsArray.map((song, index) => (
        <PlaylistItem
          key={index}
          songName={song.songName}
          album={song.album}
          artist={song.artist}
          views={song.views}
          runtime={song.runtime}
          albumCover={song.albumCover}
        />
      ))}
    </Container>
    );
  };
  
  export default CompatibleSongs;

