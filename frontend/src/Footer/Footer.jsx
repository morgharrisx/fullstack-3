import './Footer.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import spotifyLogo from './images/Spotify_Full_Logo_RGB_Green.png';

const Footer = () => (
  <footer className='footer'>
    <Container>
      <Row>
        <p>
          &copy; {new Date().getFullYear()} Vibe Fusion. All rights reserved.
        </p>
      </Row>
      <Row>

        <Col>
          <span>Powered by</span>
          <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
        </Col>

      </Row>
      <Row>
        <a href="/contact">Contact Us</a>
      </Row>
    </Container>
  </footer>
);

export default Footer