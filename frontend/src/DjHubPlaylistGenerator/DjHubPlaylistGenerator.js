import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Image, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import SuggestedSongs from "./DjHubSuggestedSongs/DjHubSuggestedSongs";
import ReusableButton from "../ReusableButton/ReusableButton";
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
  const [rateLimitMessage, setRateLimitMessage] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState({
    genre: false,
    mood: false,
    tempo: false,
    popularity: false,
    instrumentalness: false,
    danceability: false,
    energy: false,
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
          name:song.name,
          album: song.album,
          artist:  song.artist,
          popularity: song.popularity,
          valence: song.valence,
          tempo: song.tempo,
          danceability: song.danceability,
          embedUri: `https://open.spotify.com/embed/track/${song.id}`
        }));
        setSongs(formattedSongs);
        setShowSongs(true);
       
      
      } else {
        console.log("No tracks found.");
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.data.retryAfter;
        setRateLimitMessage(`Rate limit exceeded. Try again in ${retryAfter} minutes.`);
      } else {
        console.error("Error fetching tracks:", error);
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
    <Container  data-aos="fade-up" className="playlist-generator-container my-5 ">
      <Row className="playlist-generator-row">
        <Col
          xs={12}
          sm={12}
          md={10}
          lg={10}
          className="playlist-generator-col my-3"
        >
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
        <Col className="playlist-generator-col" xs={12} sm={12} md={8} lg={8}>
          <Form.Group
            controlId="genreSelect"
            className={"playlist-generator-form-group mb-3 selected"}
          >
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="form-control"
            >
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
              <option value="hip-hop">Hip-Hop</option>
              <option value="country">Country</option>
              <option value="electronic">Electronic</option>
              <option value="folk">Folk</option>
              <option value="disco">Disco</option>
              <option value="k-pop">K-Pop</option>
              <option value="reggaeton">Reggaeton</option>
              <option value="ambient">Ambient</option>
            </Form.Control>
          </Form.Group>

          <Form.Group
            controlId="moodRange"
            className={`playlist-generator-form-group mb-3 ${
              selectedCriteria.mood ? "selected" : ""
            }`}
          >
            <Form.Check
              type="checkbox"
              label="Mood (Valence)"
              checked={selectedCriteria.mood}
              onChange={() => toggleSelection("mood")}
            />
            <Form.Range
              min={0}
              max={1}
              step={0.01}
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="form-range"
            />
             <Form.Text>Mood: {Math.floor(mood * 100)}</Form.Text>
          </Form.Group>

          <Form.Group controlId="tempoRange"
            className={`playlist-generator-form-group mb-3 ${
              selectedCriteria.tempo ? "selected" : ""
            }`}
          >
            <Form.Check
              type="checkbox"
              label="Tempo (BPM)"
              checked={selectedCriteria.tempo}
              onChange={() => toggleSelection("tempo")}
            />
            <Form.Range
              min={0}
              max={200}
              step={1}
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              className="form-range"
            />
            <Form.Text>{tempo} BPM</Form.Text>
          </Form.Group>

          <Form.Group
            controlId="popularityRange"
            className={`playlist-generator-form-group mb-3 ${
              selectedCriteria.popularity ? "selected" : ""
            }`}
          >
            <Form.Check
              type="checkbox"
              label="Popularity"
              checked={selectedCriteria.popularity}
              onChange={() => toggleSelection("popularity")}
            />
            <Form.Range
              min={0}
              max={100}
              value={popularity}
              onChange={(e) => setPopularity(e.target.value)}
              className="form-range"
            />
             <Form.Text>Popularity: {popularity}</Form.Text>
          </Form.Group>
          <Form.Group
            controlId="danceabilityRange"
            className={`playlist-generator-form-group mb-3 ${
              selectedCriteria.danceability ? "selected" : ""
            }`}
          >
            <Form.Check
              type="checkbox"
              label="Danceability"
              checked={selectedCriteria.danceability}
              onChange={() => toggleSelection("danceability")}
            />
            <Form.Range
              min={0}
              max={1}
              step={0.01}
              value={danceability}
              onChange={(e) => setDanceability(e.target.value)}
              className="form-range"
            />
            <Form.Text>Danceability: {Math.floor(danceability * 100)}</Form.Text>
          </Form.Group>

          <ReusableButton
            text="Search"
            onClick={handleGenerateClick}
            color={"green"}
            className="search-songs-button"
          />
        </Col>
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
      {rateLimitMessage && (
        <Row>
          <Col>
            <div className="text-center">
              <span className="text-danger">{rateLimitMessage}</span>
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
