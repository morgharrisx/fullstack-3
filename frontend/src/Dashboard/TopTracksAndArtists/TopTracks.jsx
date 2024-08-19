import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function TopTracks() {
  const [topTracks, setTopTracks] = useState([]);

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
    fetchTopTracks();
  }, []);

  return (
    <Container className="top-tracks-artists-container">
      <Row className="m-3">
        <Col>
          <h2>Your Top Tracks</h2>
          <ListGroup as="ol" numbered>
            {topTracks.map((track, index) => (
              <ListGroup.Item as="li" key={index}>
                {track.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TopTracks;
