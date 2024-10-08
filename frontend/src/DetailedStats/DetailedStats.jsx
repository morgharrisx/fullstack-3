import React, {useEffect} from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./DetailedStats.css";
import TopBpm from "./TopBpm/TopBpm";
import SmartRecommendation from "./3RecommendedSongs/3RecommendedSongs";
import TopMusicalKeys from "./TopMusicalKeys/TopMusicalKeys";
import Mood from "./Mood/Mood";
import CrowdPleaser from "./MostDanceableSong/MostDanceableSong";
import FavouriteGenres from "../Dashboard/FavouriteGenres/FavouriteGenres"
import BackButton from "../BackButton/BackButton";
import TopTracks from "../Dashboard/TopTracksAndArtists/TopTracks";
import TopArtists from "../Dashboard/TopTracksAndArtists/TopArtists";
import AOS from 'aos';
import 'aos/dist/aos.css'; 



const DetailedStats = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,  
      offset: 120,     
      once: true, 
     });
  }, []);

  return (
    <Container data-aos="fade-up">
      <Row>
        <Col className="mt-3">
        <BackButton></BackButton>
        </Col>
      </Row> 
      <Row className="mt-1 mb-3"> 
        <Col className="mt-2" xs={12} sm={12} md={12} lg={4}>
        <div className="bento-stat-container">
            <TopTracks/>
            <TopArtists/>
          </div>
        </Col>
        <Col  className="mt-2" xs={12} sm={12} md={12} lg={8}>
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
              <TopBpm width={400} height={200} />
              </div>
            </Col>
            <Col className="mt-2" xs={12} sm={12} md={12} lg={8}>
              <div className="bento-stat-container">
              <TopMusicalKeys 
                  
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
          
            <SmartRecommendation/>
           
        </Col>
        <Col className="mt-2" xs={12} sm={12} md={12} lg={4}>
            <div className="bento-stat-container">
            <Mood/>
            </div>
            
        </Col>
        <Col className="mt-2" xs={12} sm={12} md={12} lg={3}>
        <div className="bento-stat-container">
       <CrowdPleaser></CrowdPleaser>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailedStats;
