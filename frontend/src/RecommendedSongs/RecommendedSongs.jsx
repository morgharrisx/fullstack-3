import React, { useEffect, useState } from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import ReusableButton from '../ReusableButton/ReusableButton';
import { Container, Row, Col, Image, Placeholder } from 'react-bootstrap';
import './RecommendedSongs.css'

const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';

//Converts runtime to mm:ss format
const convertToMMSS = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const RecommendedSongs = ({playlistCover}) => { 
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchSongs = async () => {
        try {
          const response = await fetch(`${CORS_PROXY}https://api.deezer.com/chart`);
          const data = await response.json();
          setSongs(data.tracks.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching songs:', error);
          setLoading(false);
        }
      };
      fetchSongs();
    }, []);
    if (loading) return <div>Loading. Please wait...</div>;
    const albumCovers = songs.slice(0,4).map((songs) => songs.album.cover_medium);
    return (
      <div className='playlist-page'>
        <Container fluid>
          <Row className='title-row'>
            <Col xs={6} className='cover-col'>
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
          <Col xs={5} className='title-col'>
            <h2>Recommended For You</h2>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col className='recommended-songs-container'>
            <PlaylistItem className='header'
              songName="Song"
              album="Album"
              artist="Artist"  
              views="Views"
              runtime="Length"
              isHeader={true}
            />
            {songs.map((song) => (
              <PlaylistItem
                key={song.id}
                songName={song.title}
                album={song.album.title}
                artist={song.artist.name}
                views={song.rank} //Do we need this?
                runtime={convertToMMSS(song.duration)}
                albumCover={song.album.cover_small}
              />
            ))}
            <ReusableButton></ReusableButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default RecommendedSongs;
