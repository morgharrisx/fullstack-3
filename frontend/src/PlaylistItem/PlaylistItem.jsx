import React from 'react';
import { Row, Col, Image, Placeholder, Container } from 'react-bootstrap';
import './playlistitem.css';

const PlaylistItem = ({ songName, album, artist, views, runtime, albumCover, isHeader }) => {
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
            <Col xs={3}>
              <span className="song-name">{songName}</span>
            </Col>
            <Col xs={3}>
              <span className="album-name">{album}</span>
            </Col>
            <Col xs={2}>
              <span className="artist-name">{artist}</span>
            </Col>
            <Col xs={2}>
              <span className="views">{views}</span>
            </Col>
            <Col xs={1}>
              <span className="runtime">{runtime}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistItem;
