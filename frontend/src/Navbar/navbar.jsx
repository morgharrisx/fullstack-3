import { Container, Navbar, Nav } from 'react-bootstrap';
import './navbar.css';
import ReusableButton from '../ReusableButton/ReusableButton';
import GreenLogo from './logo/green-logo.png';
import { Link } from 'react-router-dom';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="custom-bg">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img
            src={GreenLogo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className="link-styles" to="/">
              <Nav.Link as="span" className="fw-bold quantico-bold">VibeFusion</Nav.Link>
            </Link>
          </Nav>
          <Link className="link-styles" to="/contact">
            <Nav.Link as="span" className="ml-auto mx-3 Montserrat">Contact Us</Nav.Link>
          </Link>
          <Link className="link-styles" to="/profile">
            <Nav.Link as="span" className="ml-auto mx-3 Montserrat">My profile</Nav.Link>
          </Link>
          <Link to="http://localhost:5001/login">
            <ReusableButton size="sm" text="Log in / Sign up" color="pink" />
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

