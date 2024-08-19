import React, {useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import PlaylistItem from '../../PlaylistItem/PlaylistItem'
import ReusableButton from '../../ReusableButton/ReusableButton';
import './suggestedsongs.css'; 
import axios from 'axios';
import VerticalModal from '../Modal/Modal';


const SuggestedSongs = ({ songs }) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const handleGeneratePlaylist = async () => {
        try {
            const trackUris = songs.map(song => `spotify:track:${song.id}`);
            console.log(trackUris);
            const response = await axios.post('http://localhost:5001/create-playlist', {
                trackUris: trackUris
            });
            if (response.status === 200) {
                setModalContent({
                    title: 'Success',
                    body: 'Playlist created successfully!'
                  });
            } else {
                setModalContent({
                    title: 'Failure',
                    body: 'Failed to create playlist.'
                  });
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            setModalContent({
                title: 'Error',
                body: 'An error occurred while creating the playlist.'
              });
        }finally {
            setModalShow(true);
          }
    }
    return (
        <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="playlist-generator-col align-items-center mx-2">
            <p className="playlist-generator-suggested-header display-6">Suggested Songs</p>
            {songs.length > 0 ? (
            <div className="playlist-generator-suggested-list my-3">
                {songs.map(song => (
                    <PlaylistItem className="generator-playlist"
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
             ) : (<p className='lead'>There are no matching songs with selected criteria</p> 
        )}
            {songs.length > 0 && (
            <ReusableButton text="Create Playlist" color={'green'} onClick={handleGeneratePlaylist} className="playlist-generator-button" />
        )}
        </Col>
        <VerticalModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalContent.title}
        body={modalContent.body}
        />
        </Row>
    );
};

export default SuggestedSongs;
