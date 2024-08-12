import React, {useState} from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./BentoGrid.css";
import TopList from "./TopList/TopList";
import FavouriteGenres from "./FavouriteGenres/FavouriteGenres";
import TopBpm from "./TopBpm/TopBpm";
import CompatibleSongs from "./CompatibleSongs/CompatibleSongs";
import TopMusicalKeys from "./TopMusicalKeys/TopMusicalKeys";
import Mood from "./Mood/Mood";

const BentoGrid = () => {
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


  return (
    <Container>
      <Row>
        <Col className="mb-3 bento-stat-container" xs={12} sm={12} md={12} lg={3}>
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
          
        </Col>
        <Col xs={12} sm={12} md={12} lg={9}>
          <Row>
            <Col>
              <div className="box">
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
            <Col className="mb-3" xs={12} sm={12} md={12} lg={4}>
              <div className="box">
                <TopBpm
                  data={[
                    { name: "Genre 1", bpm: 120 },
                    { name: "Genre 2", bpm: 128 },
                    { name: "Genre 3", bpm: 135 },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </Col>
            <Col className="mb-3" xs={12} sm={12} md={12} lg={8}>
              <div className="box">
                <TopMusicalKeys />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        {/* To do: figure out placing the titles of boxes at the top and fixing the most compatible songs box */}
        <Col className="mb-3" xs={12} sm={12} md={12} lg={5}>
          <div className="box">
            <CompatibleSongs compatibleSongsArray={compatibleSongsArray} />
           
          </div>
        </Col>
        <Col className="mb-3 bento-stat-container" xs={12} sm={12} md={12} lg={4}>
            <Mood />
        </Col>
        <Col className="mb-3" xs={12} sm={12} md={12} lg={3}>
          <div className="box">
            <p className="lead">Crowd pleaser (most danceable song)</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BentoGrid;
