import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CrowdPleaser.css';
import ReusableButton from '../../ReusableButton/ReusableButton';
import {Link} from "react-router-dom";

const CrowdPleaser = () => {

    const [mostDanceableSong, setMostDanceableSong] = useState(""); 
    const [mostDanceableSongUri, setMostDanceableSongUri] = useState(''); 
    useEffect(() => {
      const fetchMostDanceableSong = async () => {
        try {
          const response = await fetch("http://localhost:5001/danceability");
          const data = await response.json();
          console.log("most Danceable Song", data); 
          setMostDanceableSong(data.name);  
          setMostDanceableSongUri(data.embedUri);
        } catch (error) {
          console.error("Error getting danceability:", error);
        }
      };

      fetchMostDanceableSong(); 
    }, []); 

  return (
    <Container className='justify-content-center align-items-center' >
      <Row>
        <Col>
        <p className='lead'>Most danceable track: Your party must-have!</p>
        <iframe 
        src={mostDanceableSongUri}
        width="250px" 
        height="250px" // to do: fix the size
        frameBorder="0" 
        allowtransparency="true" 
        allow="encrypted-media"
        title="Spotify Player"
      ></iframe>
        <Link to="/dj-hub"><ReusableButton color={'pink'} text={'Go to DJ Hub'}></ReusableButton></Link>  
        </Col>
      </Row>
      
    </Container>
  );
}

export default CrowdPleaser;
