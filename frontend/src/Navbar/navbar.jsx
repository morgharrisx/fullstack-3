import { Container, Navbar, Nav } from 'react-bootstrap';
import './navbar.css';
import ReusableButton from '../ReusableButton/ReusableButton';
import GreenLogo from './logo/green-logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../IsLoggedIn/AuthProvider'

function NavScrollExample() {
  const { isAuthenticated, logout } = useAuth();

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
              <Nav.Link as="span" className="fw-bold">VibeFusion</Nav.Link>
            </Link>
          </Nav>
          <Link className="link-styles" to="/contact">
            <Nav.Link as="span" className="ml-auto mx-3">Contact Us</Nav.Link>
          </Link>
          <Link className="link-styles" to="/profile">
            <Nav.Link as="span" className="ml-auto mx-3">My profile</Nav.Link>
          </Link>
          {isAuthenticated ? (
            <ReusableButton size="sm" text="Logout" color="pink" onClick={logout}/>
          ) : (
          <Link to="http://localhost:5001/login">
            <ReusableButton size="sm" text="Log in / Sign up" color="pink" />
          </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

