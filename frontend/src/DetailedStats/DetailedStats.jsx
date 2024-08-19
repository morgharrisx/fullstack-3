import React, {useState} from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./DetailedStats.css";
import TopList from "./TopList/TopList";
import FavouriteGenres from "./FavouriteGenres/FavouriteGenres";
import TopBpm from "./TopBpm/TopBpm";
import CompatibleSongs from "./CompatibleSongs/CompatibleSongs";
import TopMusicalKeys from "./TopMusicalKeys/TopMusicalKeys";
import Mood from "./Mood/Mood";
import CrowdPleaser from "./CrowdPleaser/CrowdPleaser";

const DetailedStats = () => {
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
 

  const [topMusicalKeys, setTopMusicalKeys] = useState([
    { name: 'C Major', minutesListened: 120 },
    { name: 'G Major', minutesListened: 90 },
    { name: 'A Minor', minutesListened: 75 },
  ]);


  return (
    <Container>
      <Row className="mt-5 mb-3"> 
        <Col className="mt-2" xs={12} sm={12} md={12} lg={3}>
        <div className="bento-stat-container">
            <TopList
              items={[
                "artist",
                "artist",
                "artist",
                "artist",
                "artist",
                "artist",
                "artist",
                "artist",
                "artist",
                "artist",
              ]}
              listName={"Artists"}
            />
            <br />
            <TopList
              items={[
                "songs",
                "songs",
                "songs",
                "songs",
                "songs",
                "songs",
                "songs",
                "songs",
                "songs",
                "songs",
              ]}
              listName={"Songs"}
            />
          </div>
        </Col>
        <Col  className="mt-2" xs={12} sm={12} md={12} lg={9}>
          <Row>
            <Col>
              <div className="bento-stat-container">
                <FavouriteGenres
                  data={[
                    { name: "Rock", value: 400 },
                    { name: "Pop", value: 300 },
                    { name: "Hiphop", value: 300 },
                  ]}
                  width={400}
                  height={400}
                  innerRadius={50}
                  outerRadius={120}
                />
                <p className="lead">
                  Get a visual spin on your music tastes! Here are the top 3 genres that have captured your attention recently.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col  xs={12} sm={12} md={12} lg={4}>
              <div className="bento-stat-container">
              <TopBpm width={400} height={200} />
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
