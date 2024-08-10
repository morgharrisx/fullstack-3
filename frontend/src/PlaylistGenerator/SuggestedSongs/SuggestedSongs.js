// SuggestedSongs.js
import React from 'react';
import { Col } from 'react-bootstrap';
import PlaylistItem from '../../PlaylistItem/PlaylistItem'
import ReusableButton from '../../ReusableButton/ReusableButton';
import './suggestedsongs.css'; 

const SuggestedSongs = ({ songs }) => {
    return (
        <Col md={5} className="playlist-generator-col mx-2">
            <h5 className="playlist-generator-suggested-header">Suggested Songs</h5>
            <div className="playlist-generator-suggested-list">
                {songs.map(song => (
                    <PlaylistItem 
                        key={song.id}
                        songName={song.songName}
                        album={song.album}
                        artist={song.artist}
                        views={song.views}
                        runtime={song.runtime}
                        albumCover={song.albumCover}
                    />
                ))}
            </div>
            <ReusableButton text="Create Playlist" className="playlist-generator-button" />
        </Col>
    );
};

export default SuggestedSongs;
