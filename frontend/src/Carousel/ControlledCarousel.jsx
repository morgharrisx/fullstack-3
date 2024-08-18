import { useState } from 'react';
import './carousel.css'; 
import Carousel from 'react-bootstrap/Carousel';
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import ReusableButton from '../ReusableButton/ReusableButton';
import { Link } from 'react-router-dom';

function ControlledCarousel({ isLoggedIn }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getButtonLink = () => {
    return isLoggedIn ? "/dashboard" : "/login";
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className='  carousel-item'>
      <img src={img1} alt="" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Discover Your Music Stats</h3>
          <p>Dive into your Spotify listening history with VibeFusion! Get detailed insights into your most-played tracks, favorite genres, and top artists.</p>
          <a href="/login"><ReusableButton size="sm" variant="success" text='Learn more'></ReusableButton></a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img2} alt="second slide" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Become the Ultimate DJ</h3>
          <p>Unleash your inner DJ with VibeFusion! Create and customize playlists with ease, and let our smart recommendations help you curate the perfect soundtrack for any occasion.</p>
          <a href="/login"><ReusableButton size="sm" variant="success" text='Learn more'></ReusableButton></a>
        </Carousel.Caption >
      </Carousel.Item>
      <Carousel.Item>
      <img src={img3} alt="third slide" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Personalized Playlists Just for You</h3>
          <p>
          With VibeFusion, enjoy personalized playlists tailored to your unique listening habits. Whether you're working out, relaxing, or partying, we've got the perfect playlist for you. 
          </p>
          <Link to="/recommended"> {/* Link to the recommended page */}
            <ReusableButton size="sm" variant="success" text='Learn more' />
          </Link>
          {/* <a href="/login"><ReusableButton size="sm" variant="success" text='Learn more'></ReusableButton></a> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;