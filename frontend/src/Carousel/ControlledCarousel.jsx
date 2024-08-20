import { useState } from "react";
import "./carousel.css";
import { Carousel } from "react-bootstrap";
import img1 from "./images/1.png";
import img2 from "./images/2.png";
import img3 from "./images/3.png";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const images = [img1, img2, img3];

  return (
    <Carousel
      className="carousel-container"
      activeIndex={index}
      onSelect={handleSelect}
    >
      {images.map((image, index) => (
        <Carousel.Item key={index} className="carousel-item">
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="d-block carousel-image"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
