import './Footer.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import spotifyLogo from './images/Spotify_Full_Logo_RGB_Green.png';

const Footer = () => (
  <footer className='footer'>
    <Container>
      <Row>
        <Col>
          <p>
            <strong>&copy; {new Date().getFullYear()} VibeFusion. All rights reserved.</strong>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className='tagline'>Your home for fusing the perfect musical vibes!</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Powered by</span>
          <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="/contact">Contact Us</a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer