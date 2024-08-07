import {Button, Container, Navbar, Nav } from 'react-bootstrap';
import './navbar.css'; 
import ReusableButton from '../ReusableButton/ReusableButton';


function NavScrollExample() {
  return (
    <Navbar expand="lg" className="custom-bg">
      <Container fluid>
      <Navbar.Brand href="#home" className="our-logo">
                        <img
                            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo" //to be replaced with our one
                        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className='fw-bold'>VibeFusion</Nav.Link>
          </Nav>
            <Nav.Link className='ml-auto mx-3' href="#contact">Contact Us</Nav.Link>
            {/* <Button variant="success">Log in / Sign up</Button> */}
            <ReusableButton size= 'lg' text='Log in / Sign up' onClick= 'handle.OnClick' color= 'success' />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavScrollExample;