import ListGroup from "react-bootstrap/ListGroup";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
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

    fetchTopArtists();
  }, []);

  return (
    <Container className="top-tracks-artists-container">
      <Row className="m-3">
        <Col >
          <h2>Your Top Artists</h2>
          <ListGroup as="ol" numbered>
            {topArtists.map((artist, index) => (
              <ListGroup.Item as="li" key={index}>
                {artist.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TopArtists;
