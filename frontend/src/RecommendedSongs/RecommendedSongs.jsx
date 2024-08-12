import React, { useEffect, useState } from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import { Container } from 'react-bootstrap';

const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';

//Converts runtime to mm:ss format
const convertToMMSS = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const RecommendedSongs = () => {
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
    return (
        <div className="recommended-songs">
            <h2>Recommended Songs</h2>
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
        </div>
      );
    };
    export default RecommendedSongs;