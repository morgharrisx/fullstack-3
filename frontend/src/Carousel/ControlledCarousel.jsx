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
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img2} alt="second slide" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption >
      </Carousel.Item>
      <Carousel.Item>
      <img src={img3} alt="third slide" className="d-block carousel-image" />
        <Carousel.Caption className="carousel-caption">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;