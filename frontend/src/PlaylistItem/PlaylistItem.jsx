import React from 'react';
import { Row, Col, Image, Placeholder, Container } from 'react-bootstrap';
import './playlistitem.css';

const PlaylistItem = ({ songName, album, artist, views, runtime, albumCover, isHeader }) => {
  const formattedViews = views?.toLocaleString();
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Row className={`playlist-item align-items-center ${isHeader ? 'playlist-header' : ''}`}>
            <Col xs={1}>
              { isHeader ? (
                <span></span> 
              ) : albumCover ? (
                <Image src={albumCover} className="album-cover-image" roundedCircle />
              ) : (
                <Placeholder as="div" animation="glow" className="album-cover-placeholder">
                  <Placeholder xs={12} className="placeholder-box"/>
                </Placeholder>
              )}
            </Col>
            <Col xs={4} sm={3} className="text-truncate">
              <span className="song-name">{songName}</span>
            </Col>
            <Col xs={4} sm={3} className="text-truncate">
              <span className="album-name">{album}</span>
            </Col>
            <Col xs={4} sm={2} className="text-truncate centered-col">
              <span className="artist-name">{artist}</span>
            </Col>
            <Col xs={4} sm={2} className="text-truncate centered-col">
              <span className="views">{formattedViews}</span>
            </Col>
            <Col xs={4} sm={1} className="centered-col">
              <span className="runtime">{runtime}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistItem;
