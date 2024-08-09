import React from 'react';
import { Row, Col, Image, Placeholder } from 'react-bootstrap';
import './playlistitem.css';
// import musicNoteImage from './images/musicnote.png';

const PlaylistItem = ({ songName, album, artist, views, runtime, albumCover }) => {
  return (
    <Row className="playlist-item align-items-center">
      <Col xs={1}>
      {albumCover ? (
          <Image src={albumCover} className="album-cover-image" rounded />
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
      <Col xs={3}>
      <span className="artist-name">{artist}</span>
      </Col>
      <Col xs={1}>
        <span className="views">{views}</span>
      </Col>
      <Col xs={1}>
        <span className="runtime">{runtime}</span>
      </Col>
    </Row>
  );
};

export default PlaylistItem;

