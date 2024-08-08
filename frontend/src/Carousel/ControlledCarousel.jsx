import { useState } from 'react';
import './carousel.css'; 
import Carousel from 'react-bootstrap/Carousel';
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img src={img1} alt="first slide" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Unleash your inner DJ!</h3>
          <p>Craft your personalised playlists for every occasion.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img2} alt="second slide" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Your headphones, your rules!</h3>
          <p>Revisit the songs that shaped your year.</p>
        </Carousel.Caption >
      </Carousel.Item>
      <Carousel.Item>
      <img src={img3} alt="third slide" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Chart your rhythm!</h3>
          <p>See which artists, albums and genres have captured your heart.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;