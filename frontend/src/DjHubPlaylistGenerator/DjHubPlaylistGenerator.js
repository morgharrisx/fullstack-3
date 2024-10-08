import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Image, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import SuggestedSongs from "./DjHubSuggestedSongs/DjHubSuggestedSongs";
import DjHubPlaylistGeneratorForm from "./DjHubPlaylistGeneratorForm"; 
import "./DjHubPlaylistGenerator.css";
import perfectMatch from "./perfectmatch.png";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const PlaylistGenerator = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,  
      offset: 120,     
      once: true, 
    });
  }, []);

  const [showSongs, setShowSongs] = useState(false);
  const [songs, setSongs] = useState([]);
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState(0.5);
  const [tempo, setTempo] = useState(100);
  const [popularity, setPopularity] = useState(50);
  const [danceability, setDanceability] = useState(0.5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState({
    genre: false,
    mood: false,
    tempo: false,
    popularity: false,
    danceability: false,
  });

  const suggestedSongsRef = useRef(null);

  const toggleSelection = (criteria) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [criteria]: !prev[criteria],
    }));
  };

  const handleGenerateClick = async () => {
    setLoading(true);
    setMessage(null)
    try {
      const url = `http://localhost:5001/dj`;
      const requestData = {
        genre: genre.toLowerCase(),
      };
      if (selectedCriteria.mood) requestData.mood = mood;
      if (selectedCriteria.tempo) requestData.tempo = tempo;
      if (selectedCriteria.popularity) requestData.popularity = popularity;
      if (selectedCriteria.danceability) requestData.danceability = danceability;
      const response = await axios.post(url, requestData);

      if (response.data && response.data.data) {
        const formattedSongs = response.data.data.map((song) => ({
          id: song.id,
          name: song.name,
          album: song.album,
          artist: song.artist,
          popularity: song.popularity,
          valence: song.valence,
          tempo: song.tempo,
          danceability: song.danceability,
          embedUri: `https://open.spotify.com/embed/track/${song.id}`
        }));
        setSongs(formattedSongs);
        setShowSongs(true);
      } else {
        setShowSongs(false);
        setMessage("No matching songs found. Please try adjusting your filters.");
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.data.retryAfter;
        setMessage(`Rate limit exceeded. Try again in ${retryAfter} minutes.`);
        setShowSongs(false);
      }else if (error.response.status === 404) {
        setMessage("No matching songs found. Please try adjusting your filters.");
        setShowSongs(false);
      }else {
        console.error("Error fetching tracks:", error);
        setMessage("An error occurred while fetching tracks. Please try again later.")
        setShowSongs(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showSongs && suggestedSongsRef.current) {
      suggestedSongsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showSongs]);

  return (
    <Container data-aos="fade-up" className="playlist-generator-container mt-5">
      <Row className="playlist-generator-row">
        <Col xs={12} sm={12} md={10} lg={10} className="playlist-generator-col my-3">
          <Row className="align-items-center">
            <Col xs={12} sm={6} md={5} lg={4}>
              <Image fluid style={{ width: "200px", height: "auto" }} src={perfectMatch} alt="Perfect Match" />
            </Col>
            <Col xs={12} sm={6} md={7} lg={8}>
              <p className="playlist-generator-suggested-header display-6">Find your perfect match</p>
              <p className="lead">Your playlist, your rules! Set your preferences and uncover songs that perfectly match your taste.</p>
              <OverlayTrigger
                placement="top"
                delayShow={300}
                delayHide={150}
                overlay={
                  <Tooltip>
                    1. Select a genre (required).<br />
                    2. Check the boxes for additional filters (optional).<br />
                    3. Use the sliders to set your desired range.<br />
                    4. Click "Search" to generate your playlist.
                  </Tooltip>
                }
              >
                <p className="lead" style={{ cursor: "pointer", color: "#1e6101" }}>
                  Learn how use
                </p>
              </OverlayTrigger>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="playlist-generator-row my-5">
        <DjHubPlaylistGeneratorForm
          genre={genre}
          setGenre={setGenre}
          mood={mood}
          setMood={setMood}
          tempo={tempo}
          setTempo={setTempo}
          popularity={popularity}
          setPopularity={setPopularity}
          danceability={danceability}
          setDanceability={setDanceability}
          selectedCriteria={selectedCriteria}
          toggleSelection={toggleSelection}
          handleGenerateClick={handleGenerateClick}
        />
      </Row>

      {loading && (
        <Row>
          <Col>
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </Col>
        </Row>
      )}

      {message && !loading && (
        <Row>
          <Col>
            <div className="text-center">
              <span className="text-warning">{message}</span>
            </div>
          </Col>
        </Row>
      )}


      {showSongs && !loading && (
        <div className="playlist-generator-row" ref={suggestedSongsRef}>
          <SuggestedSongs songs={songs} />
        </div>
      )}
    </Container>
  );
};

export default PlaylistGenerator;