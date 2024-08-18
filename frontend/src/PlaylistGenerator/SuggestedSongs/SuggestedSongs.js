import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PlaylistItem from '../../PlaylistItem/PlaylistItem'
import ReusableButton from '../../ReusableButton/ReusableButton';
import './suggestedsongs.css'; 


const SuggestedSongs = ({ songs }) => {
    function handleGeneratePlaylist () {
        //TODO: Push it to users spotify
    }
    return (
        <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="playlist-generator-col align-items-center mx-2">
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
            <ReusableButton text="Create Playlist" color={'green'} onClick={handleGeneratePlaylist} className="playlist-generator-button" />
        </Col>
        </Row>
    );
};

export default SuggestedSongs;
