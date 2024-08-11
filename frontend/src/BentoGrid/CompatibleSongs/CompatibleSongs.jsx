import React from 'react';
import { Row, Col, Image, Placeholder, Container } from 'react-bootstrap';

const CompatibleSongs = ({ songName, album, artist, albumCover }) => {
    return (
      <Row className="playlist-item align-items-center">
        <Col xs={2} className="d-flex justify-content-center">
          {albumCover ? (
            <Image src={albumCover} className="album-cover-image rounded" />
          ) : (
            <Placeholder as="div" animation="glow" className="album-cover-placeholder">
              <Placeholder xs={12} className="placeholder-box" />
            </Placeholder>
          )}
        </Col>
        <Col xs={7}>
          <div className="song-details">
            <div className="song-name">{songName}</div>
            <div className="album-name">{album}</div>
            <div className="artist-name">{artist}</div>
          </div>
        </Col>
      </Row>
    );
  };
  
  export default CompatibleSongs;

