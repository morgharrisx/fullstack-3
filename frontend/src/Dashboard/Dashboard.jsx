import React, {useEffect} from "react";
import "./Dashboard.css";
import { Container, Row, Col } from "react-bootstrap";
import FavouriteGenres from "./FavouriteGenres/FavouriteGenres";
import TopTracks from "./TopTracksAndArtists/TopTracks";
import ReusableButton from "../ReusableButton/ReusableButton";
import { Link } from "react-router-dom";
import TopArtists from "./TopTracksAndArtists/TopArtists";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Dashboard = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,  
      offset: 120,     
      once: true, 
     });
  }, []);
  return (
    <Container data-aos="fade-up" className="dashboard-container">
      <Row className="mt-3">
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row className="first-row-stats">
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <FavouriteGenres></FavouriteGenres>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
              <TopTracks/>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
              <TopArtists/>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end m-3">
               <Link to='/detailed-stats'><ReusableButton className="see-more-button" text={"See more"} color={"green"}></ReusableButton></Link>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3 second-row">
        <Col xs={12} sm={12} md={12} lg={6}>
          <div className="playlist-section">
            <p className="lead">
              Discover the perfect playlist tailored just for you. Get insights
              and smart recommendations that match your unique taste in music.
            </p>
            <Link to="/smart-recommendations"><ReusableButton text={"Smart recommendations"} color={"green"}></ReusableButton></Link>
              
          </div>
        </Col>

        <Col xs={12} sm={12} md={12} lg={6}>
          <div className="playlist-section gradient-border-container">
            <p className="lead">
              Take control of your music experience! Adjust the tempo,
              popularity, and more to discover songs that perfectly match your
              vibe. Become the ultimate DJ with personalized track suggestions
              tailored to your preferences.
            </p>
           <Link to="/dj-hub"><ReusableButton text={"Go to DJ Hub"} color={"green"}></ReusableButton></Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
