import React, {useState, useEffect} from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./DetailedStats.css";
import TopList from "./TopList/TopList";
import TopBpm from "./TopBpm/TopBpm";
import CompatibleSongs from "./CompatibleSongs/CompatibleSongs";
import TopMusicalKeys from "./TopMusicalKeys/TopMusicalKeys";
import Mood from "./Mood/Mood";
import CrowdPleaser from "./CrowdPleaser/CrowdPleaser";
import FavouriteGenres from "../Dashboard/FavouriteGenres/FavouriteGenres"
import BackButton from "../BackButton/BackButton";


const DetailedStats = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch("http://localhost:5001/top-tracks");
        const data = await response.json();
        console.log(data);
        setTopTracks(data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const response = await fetch("http://localhost:5001/top-artists");
        const data = await response.json();
        console.log("Top Artists:", data);
        setTopArtists(data.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    fetchTopTracks();
    fetchTopArtists();
  }, []);

  useEffect(() => {
    console.log("Top Tracks state updated:", topTracks);
  }, [topTracks]);

  useEffect(() => {
    console.log("Top Artists state updated:", topArtists);
  }, [topArtists]);
  
  const [compatibleSongsArray, setCompatibleSongsArray] = useState([
    {
      songName: 'Shape of You',
      album: '÷ (Divide)',
      artist: 'Ed Sheeran'
    },
    {
      songName: 'Blinding Lights',
      album: 'After Hours',
      artist: 'The Weeknd'
    },
    {
      songName: 'Levitating',
      album: 'Future Nostalgia',
      artist: 'Dua Lipa'
    }
  ]);

  const [topBPM, setTopBPM] = useState([
    { name: 'Bpm A', size: 600 },
    { name: 'Bpm B', size: 300 },
    { name: 'Bpm C', size: 100 },
  ]);

  const [topMusicalKeys, setTopMusicalKeys] = useState([
    { name: 'C Major', minutesListened: 120 },
    { name: 'G Major', minutesListened: 90 },
    { name: 'A Minor', minutesListened: 75 },
  ]);


  return (
    <Container>
      <Row>
        <Col className="mt-3">
        <BackButton></BackButton>
        </Col>
      </Row>
     
      <Row className="mt-1 mb-3"> 
        <Col className="mt-2" xs={12} sm={12} md={12} lg={3}>
        <div className="bento-stat-container">
        <TopList
              items={topArtists.map(artist => artist.name)}
              listName={"Artists"}
            />
            <br />
            <TopList
              items={topTracks.map(track => track.name)}
              listName={"Songs"}
            />
          </div>
        </Col>
        <Col  className="mt-2" xs={12} sm={12} md={12} lg={9}>
          <Row>
            <Col>
              <div className="bento-stat-container">
                
                <FavouriteGenres/>
                <p className="lead my-2">
                  Get a visual spin on your music tastes! Here are the top 5 genres that have captured your attention recently.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col  xs={12} sm={12} md={12} lg={4}>
              <div className="bento-stat-container">
              <TopBpm data={topBPM} width={400} height={200} />
              </div>
            </Col>
            <Col className="mt-2" xs={12} sm={12} md={12} lg={8}>
              <div className="bento-stat-container">
              <TopMusicalKeys 
                  data={topMusicalKeys} 
                  xAxisKey="name" 
                  yAxisKey="minutesListened" 
                  barColor="#8884d8"
                  width={600}
                  height={300}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={12} sm={12} md={12} lg={5}>
          
            <CompatibleSongs compatibleSongsArray={compatibleSongsArray} />
           
        </Col>
        <Col className="mt-2" xs={12} sm={12} md={12} lg={4}>
            <div className="bento-stat-container">
            <Mood/>
            </div>
            
        </Col>
        <Col className="mt-2" xs={12} sm={12} md={12} lg={3}>
        <div className="bento-stat-container">
       <CrowdPleaser songName={'Levitating'} artist={'Dua Lipa'}></CrowdPleaser>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailedStats;
