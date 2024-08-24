import React, {useEffect, useState} from 'react';
import {Container } from 'react-bootstrap';
import './3RecommendedSongs.css'
import ReusableButton from '../../ReusableButton/ReusableButton'
import { Link } from 'react-router-dom';

const SmartRecommendation = ({SmartRecommendationArray}) => {

  const [smartRecommendationSong, setSmartRecommendationSong] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5001/recommendations");
          const result = await response.json();
          if (result) {
            const formattedSongs = result.map((song) => ({
              id: song.id,
              name:song.name,
              album: song.album,
              artist:  song.artists,
              embedUri: `https://open.spotify.com/embed/track/${song.id}`
            }));
            const topThreeSongs = formattedSongs.slice(0, 3);
            setSmartRecommendationSong(topThreeSongs);
          }
        } catch (error) {
          console.error("Error fetching recommended songs:", error);
        }
      };
  
      fetchData();
    }, []);
    return (
      <Container className='compatible-songs-container'>
      <p className="lead">Smart recommendations</p>
      {smartRecommendationSong.length > 0 ? (
        smartRecommendationSong.map((song, index) => (
          <div className="song-container" key={song.id}>
            <p>{song.name}</p>
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
      <Link to="/smart-recommendations"><ReusableButton color={'pink'} text={'See more'}></ReusableButton></Link>
    </Container>
    );
  };
  
  export default SmartRecommendation;

