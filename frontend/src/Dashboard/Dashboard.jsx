import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Container, Row, Col } from "react-bootstrap";
import FavouriteGenres from "./FavouriteGenres/FavouriteGenres";
import NumberedList from "./NumberedList/NumberedList";
import ReusableButton from "../ReusableButton/ReusableButton";

const Dashboard = () => {
  const [topTracks, setTopTracks] = useState([]); 
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch("http://localhost:5001/top-track");
        const data = await response.json();
        console.log(data); 
        setTopTracks(data.data.slice(0, 10)); 
        setTopArtists(data.data.slice(0, 10)); 
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    fetchTopTracks(); 
  }, []);

  useEffect(() => {
    console.log("Top Tracks state updated:", topTracks); 
  }, [topTracks]);


  return (
    <Container className="dashboard-container">
      <Row className="mt-3">
        <Col xs={12} sm={12} md={12} lg={12}>
          <Row className="first-row-stats">
            <Row>
              <Col>
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
                ></FavouriteGenres>
              </Col>
              <Col>
              <NumberedList
                  items={topTracks.map((track) => track.song_name)} 
                  listName={"Tracks"}
                />
              </Col>
              <Col>
                <NumberedList
                  items={topArtists.map(track => track.artist_names)}  listName={"Artists"}
                ></NumberedList>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end m-3">
                {" "}
                <ReusableButton
                  className="see-more-button "
                  text={"See more"}
                ></ReusableButton>
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
            <a href="/statistics">
              <ReusableButton text={"Smart recommendations"}></ReusableButton>
            </a>
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
            <a href="/DJ-hub">
              <ReusableButton text={"Go to DJ Hub"}></ReusableButton>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
