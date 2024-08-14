import React from 'react'
import { Container, Row, Col, Placeholder, Image } from 'react-bootstrap'
import './CrowdPleaser.css'
import ReusableButton from '../../ReusableButton/ReusableButton'



const CrowdPleaser = ({songName,albumCover,artist}) => {
  return (
    <Container className='justify-content-center align-items-center' >
        <p className='lead'>Most danceable track: Your party must-have!</p>
        <Row >
            <Col>
            {albumCover ? (
          <Image src={albumCover} rounded />
        ) : (
          <Placeholder as="div" animation="glow">
             <Image src="holder.js/171x180" roundedCircle />
          </Placeholder>
        )}
            </Col>
        </Row>
        <Row>
            <Col>{songName}</Col>
        </Row>
        <Row className="mb-3">
           <Col>{artist}</Col>
        </Row >
       <ReusableButton color={'pink'} text={'Go to DJ Hub'}></ReusableButton> 
    </Container>
  )
}

export default CrowdPleaser