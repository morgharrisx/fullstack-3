import React from "react";
import { Col, Form } from "react-bootstrap";
import ReusableButton from "../ReusableButton/ReusableButton";

const PlaylistForm = ({
  genre,
  setGenre,
  mood,
  setMood,
  tempo,
  setTempo,
  popularity,
  setPopularity,
  danceability,
  setDanceability,
  selectedCriteria,
  toggleSelection,
  handleGenerateClick,
}) => {
  return (
    <Col className="playlist-generator-col" xs={12} sm={12} md={8} lg={8}>
      <Form.Group controlId="genreSelect" className={"playlist-generator-form-group mb-3 selected"}>
        <Form.Label>Genre</Form.Label>
        <Form.Control as="select" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control">
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

      <Form.Group controlId="moodRange" className={`playlist-generator-form-group mb-3 ${selectedCriteria.mood ? "selected" : ""}`}>
        <Form.Check type="checkbox" label="Mood (Valence)" checked={selectedCriteria.mood} onChange={() => toggleSelection("mood")} />
        <Form.Range min={0} max={1} step={0.01} value={mood} onChange={(e) => setMood(e.target.value)} className="form-range" />
        <Form.Text>Mood: {Math.floor(mood * 100)}</Form.Text>
      </Form.Group>

      <Form.Group controlId="tempoRange" className={`playlist-generator-form-group mb-3 ${selectedCriteria.tempo ? "selected" : ""}`}>
        <Form.Check type="checkbox" label="Tempo (BPM)" checked={selectedCriteria.tempo} onChange={() => toggleSelection("tempo")} />
        <Form.Range min={0} max={200} step={1} value={tempo} onChange={(e) => setTempo(e.target.value)} className="form-range" />
        <Form.Text>{tempo} BPM</Form.Text>
      </Form.Group>

      <Form.Group controlId="popularityRange" className={`playlist-generator-form-group mb-3 ${selectedCriteria.popularity ? "selected" : ""}`}>
        <Form.Check type="checkbox" label="Popularity" checked={selectedCriteria.popularity} onChange={() => toggleSelection("popularity")} />
        <Form.Range min={0} max={100} value={popularity} onChange={(e) => setPopularity(e.target.value)} className="form-range" />
        <Form.Text>Popularity: {popularity}</Form.Text>
      </Form.Group>

      <Form.Group controlId="danceabilityRange" className={`playlist-generator-form-group mb-3 ${selectedCriteria.danceability ? "selected" : ""}`}>
        <Form.Check type="checkbox" label="Danceability" checked={selectedCriteria.danceability} onChange={() => toggleSelection("danceability")} />
        <Form.Range min={0} max={1} step={0.01} value={danceability} onChange={(e) => setDanceability(e.target.value)} className="form-range" />
        <Form.Text>Danceability: {Math.floor(danceability * 100)}</Form.Text>
      </Form.Group>

      <ReusableButton text="Search" onClick={handleGenerateClick} color={"green"} className="search-songs-button" />
    </Col>
  );
};

export default PlaylistForm;