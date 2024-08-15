import React from 'react';
import { Col } from 'react-bootstrap';
import PlaylistItem from '../../PlaylistItem/PlaylistItem'
import ReusableButton from '../../ReusableButton/ReusableButton';
import './suggestedsongs.css'; 


const SuggestedSongs = ({ songs }) => {
    function handleGeneratePlaylist () {
        //TODO: Push it to users spotify
    }
    return (
        <Col md={5} className="playlist-generator-col mx-2">
            <p className="playlist-generator-suggested-header display-6">Suggested Songs</p>
            <div className="playlist-generator-suggested-list my-3">
                {songs.map(song => (
                    <PlaylistItem 
                        key={song.id}
                        songName={song.songName}
                        album={song.album}
                        artist={song.artists}
                        views={song.views}
                        runtime={song.runtime}
                        albumCover={song.albumCover}
                    />
                ))}
            </div>
            <ReusableButton text="Create Playlist" onClick={handleGeneratePlaylist} className="playlist-generator-button" />
        </Col>
    );
};

export default SuggestedSongs;
