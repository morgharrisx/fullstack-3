import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'; 


function NavBar() {
    return (
        <>
            <Navbar className="custom-bg">
                <Container>
                    <Navbar.Brand href="#home" className="our-logo">
                        <img
                            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Logo" //to be replaced with our one
                        />
                    </Navbar.Brand>
                
                </Container>
            </Navbar>
        </>
    );
}

  export default NavBar;