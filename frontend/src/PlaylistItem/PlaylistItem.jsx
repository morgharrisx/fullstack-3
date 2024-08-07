import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import '../PlaylistItem/playlistitem.css';
import musicNoteImage from './images/musicnote.png';

const PlaylistItem = ({ songName, album, views, runtime }) => {
  return (
    <Row className="playlist-item align-items-center">
      <Col xs={1}>
        <Image src={musicNoteImage} className="music-note-image" />
      </Col>
      <Col xs={4}>
        <span className="song-name">{songName}</span>
      </Col>
      <Col xs={4}>
        <span className="album-name">{album}</span>
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

