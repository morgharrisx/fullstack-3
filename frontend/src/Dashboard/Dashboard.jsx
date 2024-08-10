import React from 'react'
import './Dashboard.css'
import { Container, Row, Col} from 'react-bootstrap'
import Stat1 from './stat1/stat1'
import NumberedList from './NumberedList/NumberedList';
import ReusableButton from '../ReusableButton/ReusableButton'


const Dashboard = () => {
  return (
    <Container className='dashboard-container'>
        <Row className='mt-3'>
            <Col xs={12} sm={12} md={12} lg={12}>
                <Row className='first-row-stats'>
                    <Row>
                        <Col>
                          <Stat1></Stat1>
                        </Col>
                        <Col>
                          <NumberedList items={['artist','artist','artist','artist','artist','artist','artist','artist','artist','artist']} listName={'Artists'}></NumberedList>
                        </Col>
                        <Col>
                        <NumberedList items={['song','song','song','song','song','song','song','song','song','song' ]} listName={'Tracks'}></NumberedList>
                       
                        </Col>
                    </Row>
                    <Row>
                      <Col className='d-flex justify-content-end m-3'> <ReusableButton className="see-more-button " text={'See more'}></ReusableButton></Col>
                    </Row>
                   
                  
                </Row>
            
            </Col>
        </Row>
       
        <Row className='mt-3 second-row'>
    <Col xs={12} sm={12} md={12} lg={6}>
        <div className='playlist-section'>
        <p className='lead'>Discover the perfect playlist tailored just for you. Get insights and smart recommendations that match your unique taste in music.</p>
        <a href="/statistics"><ReusableButton text={'Smart recommendations'}></ReusableButton></a>
        </div>
    </Col>
    
    <Col xs={12} sm={12} md={12} lg={6}>
        <div className='playlist-section gradient-border-container'>
        <p className='lead'>Take control of your music experience! Adjust the tempo, popularity, and more to discover songs that perfectly match your vibe. Become the ultimate DJ with personalized track suggestions tailored to your preferences.</p>
        <a href="/DJ-hub"><ReusableButton text={'Go to DJ Hub'}></ReusableButton></a>
        </div>
       
    </Col>
</Row>

    </Container>
  )
}

export default Dashboard;