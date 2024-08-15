import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import SuggestedSongs from './SuggestedSongs/SuggestedSongs';
import ReusableButton from '../ReusableButton/ReusableButton';
import './playlistgenerator.css';

const PlaylistGenerator = () => {
    const [showSongs, setShowSongs] = useState(false);
    const [songs, setSongs] = useState([]);
    const [genre, setGenre] = useState('');
    const [mood, setMood] = useState(0.5);
    const [tempo, setTempo] = useState(100);
    const [popularity, setPopularity] = useState(50);
    const [instrumentalness, setInstrumentalness] = useState(0.5);
    const [danceability, setDanceability] = useState(0.5);
    const [energy, setEnergy] = useState(0.5);

    const handleGenerateClick = async () => {
        try {
            const url = `http://localhost:5001/dj`;
            const requestData = {
                genre: genre.toLowerCase(),
                mood,
                tempo,
                popularity,
                instrumentalness,
                danceability,
                energy,
            };
            const response = await axios.post(url, requestData);
    
            if (response.data && response.data.data) {
                const formattedSongs = response.data.data.map(track => ({
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
            } else {
                console.log("No tracks found.");
            }
        } catch (error) {
            console.error("Error fetching tracks:", error);
        }
    };
    const handleDelete = (id) => {
        setSongs(songs.filter(song => song.id !== id));
    };
    return (
        <Container className="playlist-generator-container mt-5">
            <Row>
                <Col md={showSongs ? 6 : 12} className="playlist-generator-col my-3">
                <p className="playlist-generator-suggested-header display-6">Find your perfect match</p>    
                    <Form.Group controlId="genreSelect" className="playlist-generator-form-group mb-3">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control as="select" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control">
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
                    
                    <Form.Group controlId="moodRange" className="playlist-generator-form-group mb-3">
                        <Form.Label>Mood (Valence)</Form.Label>
                        <Form.Range min={0} max={1} step={0.01} value={mood} onChange={(e) => setMood(e.target.value)} className="form-range" />
                    </Form.Group>

                    <Form.Group controlId="tempoRange" className="playlist-generator-form-group mb-3">
                        <Form.Label>Tempo (BPM)</Form.Label>
                        <Form.Range min={0} max={200} step={1} value={tempo} onChange={(e) => setTempo(e.target.value)} className="form-range" />
                        <Form.Text>{tempo} BPM</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="popularityRange" className="playlist-generator-form-group mb-3">
                        <Form.Label>Popularity</Form.Label>
                        <Form.Range min={0} max={100} value={popularity} onChange={(e) => setPopularity(e.target.value)} className="form-range" />
                    </Form.Group>

                    <Form.Group controlId="instrumentalnessRange" className="playlist-generator-form-group mb-3">
                        <Form.Label>Instrumentalness</Form.Label>
                        <Form.Range min={0} max={1} step={0.01} value={instrumentalness} onChange={(e) => setInstrumentalness(e.target.value)} className="form-range" />
                    </Form.Group>

                    <Form.Group controlId="danceabilityRange" className="playlist-generator-form-group mb-3">
                        <Form.Label>Danceability</Form.Label>
                        <Form.Range min={0} max={1} step={0.01} value={danceability} onChange={(e) => setDanceability(e.target.value)} className="form-range" />
                    </Form.Group>

                    <Form.Group controlId="energyRange" className="playlist-generator-form-group mb-3">
                        <Form.Label>Energy</Form.Label>
                        <Form.Range min={0} max={1} step={0.01} value={energy} onChange={(e) => setEnergy(e.target.value)} className="form-range" />
                    </Form.Group>

                    <ReusableButton text="Generate" onClick={handleGenerateClick} className="playlist-generator-button" />
                </Col>
                {showSongs && <SuggestedSongs songs={songs} />}
            </Row>
        </Container>
    );
};

export default PlaylistGenerator;
