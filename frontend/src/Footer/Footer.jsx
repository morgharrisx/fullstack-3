import './Footer.css';
import spotifyLogo from './images/Spotify_Full_Logo_RGB_Green.png';

const Footer = () =>(
    <footer className='footer'>

         <div className="footer-content">
            <p>VibeFusion</p>
            <ul className="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            </ul>
        </div>

        <div className="powered-by">
          <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
          <span>Powered by Spotify</span>
        </div>
      
    </footer>

);

export default Footer