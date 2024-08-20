import React, { useEffect, useState } from 'react';
import ReusableButton from '../ReusableButton/ReusableButton';
import { Container, Row, Col, Image, Placeholder } from 'react-bootstrap';
import './RecommendedSongs.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import axios from 'axios'
import VerticalModal from '../PlaylistGenerator/Modal/Modal';


  const RecommendedSongs = () => { 
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", body: "" });
    const handleGeneratePlaylist = async () => {
      try {
        const trackUris = songs.map((song) => `spotify:track:${song.id}`);
        const response = await axios.post(
          "http://localhost:5001/create-playlist",
          {
            trackUris: trackUris,
          }
        );
        if (response.status === 200) {
          setModalContent({
            title: " 🥳 Playlist created!",
            body: "You'll find it on your Spotify account under the playlist name VibeFusion.",
          });
        } else {
          setModalContent({
            title: "Failure",
            body: "Failed to create playlist.",
          });
        }
      } catch (error) {
        console.error("Error creating playlist:", error);
        setModalContent({
          title: "Error",
          body: "An error occurred while creating the playlist.",
        });
      } finally {
        setModalShow(true);
      }
    };
    useEffect(() => {
      AOS.init({ 
        duration: 1000,  
        offset: 120,     
        once: true, 
       });
    }, []);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchSongs = async () => {
        try {
          const response = await fetch("http://localhost:5001/recommendations");
          const data = await response.json();
          setSongs(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching songs:', error);
          setLoading(false);
        }
      };
      fetchSongs();
    }, []);
    if (loading) return <div>Loading. Please wait...</div>;
    const albumCovers = songs.slice(0,4).map((songs) => songs.albumCover);
    return (
      <div className='playlist-page'>
        <Container data-aos="fade-up"  fluid>
          <Row className='title-row'>
            <Col xs={4} className='cover-col'>
              {albumCovers.length === 4 ? (
                <div className='playlist-cover-grid'>
                    {albumCovers.map((cover,index) => (
                      <Image key={index} src={cover} className='grid-cover-image'/>
                    ))}
                </div>
              ) : (
                <Placeholder as='div' animation='glow' className='playlist-cover-placeholder'>
                  <Placeholder xs={12} className='placeholder-box'/>
                </Placeholder>
              )}
          </Col>
          <Col xs={4} className='title-col'>
            <h2>Recommended For You</h2>
            <p className='lead my-2'>Welcome to your personalized playlist of recommended songs! We've curated a selection of tracks just for you, based on your recent listening habits and favorite genres.</p>
            <p className='lead'>Don't forget to hit the "Generate Playlist" button to save these tracks to your Spotify account ready to accompany you wherever you go. <br></br><br></br>🎶 Happy listening!</p>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xs={12} sm={12} md={9} lg={9}className='recommended-songs-container mx-auto my-4'>
          {songs.length > 0 ? (
        songs.map((song, index) => (
          <div className="song-container" key={song.id}>
            <p>{song.name} by {song.artists}</p>
            <iframe
                  src={`https://open.spotify.com/embed/track/${song.id}`}
                  width="700"
                  height="80"
                  frameBorder="0"
                  allowTransparency="true"
                  allow="encrypted-media"
                ></iframe>
          </div>
        ))
      ) : (
        <p>No recommendations available.</p>
      )}
            <br></br>
            <ReusableButton  onClick={handleGeneratePlaylist} className='generate-button' text='Build My Spotify Playlist' color='green'></ReusableButton>
          </Col>
        </Row>
        <VerticalModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalContent.title}
        body={modalContent.body}
      />
      </Container>
    </div>
  );
};
export default RecommendedSongs;
