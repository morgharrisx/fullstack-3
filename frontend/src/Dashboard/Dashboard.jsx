import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Container, Row, Col } from "react-bootstrap";
import FavouriteGenres from "./FavouriteGenres/FavouriteGenres";
import NumberedList from "./NumberedList/NumberedList";
import ReusableButton from "../ReusableButton/ReusableButton";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

  return (
    <Container className="dashboard-container">
      <Row className="mt-3">
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row className="first-row-stats">
            <Row>
              <Col>
                <FavouriteGenres></FavouriteGenres>
              </Col>
              <Col>
              <NumberedList
                  items={topTracks.map((track) => track.name)} 
                  listName={"Tracks"}
                />
              </Col>
              <Col>
                <NumberedList
                  items={topArtists.map(artist => artist.name)}  listName={"Artists"}
                ></NumberedList>
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
