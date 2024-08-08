import {Button, Container, Navbar, Nav } from 'react-bootstrap';
import './navbar.css'; 
import ReusableButton from '../ReusableButton/ReusableButton';
import GreenLogo from './logo/green-logo.png';

function handleOnClick() {
  console.log('Button clicked');
}

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="custom-bg">
      <Container fluid>
      <Navbar.Brand href="#home" className="our-logo">
                        <img
                            src={GreenLogo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Logo" 
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
            <Nav.Link className='ml-auto mx-3' href="#profile">My profile</Nav.Link>
            {/* <Button variant="success">Log in / Sign up</Button> */}
            <ReusableButton size= 'lg' text='Log in / Sign up' onClick={handleOnClick} color= 'success' /> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavScrollExample;