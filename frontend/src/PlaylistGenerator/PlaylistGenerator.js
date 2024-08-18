import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import SuggestedSongs from "./SuggestedSongs/SuggestedSongs";
import ReusableButton from "../ReusableButton/ReusableButton";
import "./playlistgenerator.css";
import perfectMatch from "./perfectmatch.png";

const PlaylistGenerator = () => {
  const [showSongs, setShowSongs] = useState(false);
  const [songs, setSongs] = useState([]);
  const [genre, setGenre] = useState("pop");
  const [mood, setMood] = useState(0.5);
  const [tempo, setTempo] = useState(100);
  const [popularity, setPopularity] = useState(50);
  const [instrumentalness, setInstrumentalness] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);

  const [selectedCriteria, setSelectedCriteria] = useState({
    genre: false,
    mood: false,
    tempo: false,
    popularity: false,
    instrumentalness: false,
    danceability: false,
    energy: false,
  });

  const toggleSelection = (criteria) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [criteria]: !prev[criteria],
    }));
  };

  const handleGenerateClick = async () => {
    try {
      const url = `http://localhost:5001/dj`;
      const requestData = {
        genre: genre.toLowerCase(),
      };
      if (selectedCriteria.mood) requestData.mood = mood;
      if (selectedCriteria.tempo) requestData.tempo = tempo;
      if (selectedCriteria.popularity) requestData.popularity = popularity;
      if (selectedCriteria.instrumentalness)
        requestData.instrumentalness = instrumentalness;
      if (selectedCriteria.danceability)
        requestData.danceability = danceability;
      if (selectedCriteria.energy) requestData.energy = energy;
      console.log(requestData);
      const response = await axios.post(url, requestData);

      if (response.data && response.data.data) {
        const formattedSongs = response.data.data.map((track) => ({
          id: track.id,
          songName: track.songName,
          artists: track.artists,
          popularity: track.popularity,
          albumCover: track.album_cover,
          songPreview: track.songPreview,
        }));

        setSongs(formattedSongs);
        setShowSongs(true);
        console.log(formattedSongs);
        console.log(requestData);
      } else {
        console.log("No tracks found.");
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };
  const handleDelete = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };
  return (
    <Container className="playlist-generator-container mt-5 ">
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
              <option value="">Choose a genre</option>
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
          </Form.Group>

          <Form.Group
            controlId="tempoRange"
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
          </Form.Group>

          <Form.Group
            controlId="instrumentalnessRange"
            className={`playlist-generator-form-group mb-3 ${
              selectedCriteria.instrumentalness ? "selected" : ""
            }`}
          >
            <Form.Check
              type="checkbox"
              label="Instrumentalness"
              checked={selectedCriteria.instrumentalness}
              onChange={() => toggleSelection("instrumentalness")}
            />
            <Form.Range
              min={0}
              max={1}
              step={0.01}
              value={instrumentalness}
              onChange={(e) => setInstrumentalness(e.target.value)}
              className="form-range"
            />
          </Form.Group>

          <Form.Group
            controlId="energyRange"
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
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
              className="form-range"
            />
          </Form.Group>

          <ReusableButton
            text="Search"
            onClick={handleGenerateClick}
            color={"green"}
            className="search-songs-button"
          />
        </Col>
      </Row>
      {showSongs && <SuggestedSongs songs={songs} />}
    </Container>
  );
};

export default PlaylistGenerator;
