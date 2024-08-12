import {Button, Container, Navbar, Nav } from 'react-bootstrap';
import './navbar.css'; 
import ReusableButton from '../ReusableButton/ReusableButton';
import GreenLogo from './logo/green-logo.png';
import { Link } from 'react-router-dom';

function handleOnClick() {
  console.log('Button clicked');
  window.location.href = 'http://localhost:5001/login';
}

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="custom-bg">
      <Container fluid>
      <Link to="/">
      <Navbar.Brand href="#home" className="our-logo">
                        <img
                            src={GreenLogo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Logo" 
                        />
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             <Link to="/"><Nav.Link href='/' className='fw-bold'>VibeFusion</Nav.Link></Link>
          </Nav>
          <Link to="/contact"><Nav.Link className='ml-auto mx-3' href="/contact">Contact Us</Nav.Link></Link>
            <Link to="/profile"><Nav.Link className='ml-auto mx-3' href="/profile">My profile</Nav.Link></Link>
            {/* <Button variant="success">Log in / Sign up</Button> */}
            <ReusableButton size= 'sm' text='Log in / Sign up' onClick={handleOnClick} color= 'success' /> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavScrollExample;
