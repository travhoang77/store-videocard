import React from "react";
import { Carousel } from "react-bootstrap";
import { CAROUSEL_TIME } from "../utils/constants";

function MainCarousel(props) {
  const msi = "msi-image.jpg";
  const nvda = "nvd-image.jpg";
  const asus = "asus-image.JPG";
  return (
    <Carousel
      style={{
        background: "white",
      }}
    >
      <Carousel.Item interval={CAROUSEL_TIME}>
        <img className="d-block w-100" src={`/img/${msi}`} alt="First slide" />
        <Carousel.Caption>
          <h3>MSI Exclusive Ampere</h3>
          <p>Ray Tracying Enabled</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={CAROUSEL_TIME}>
        <img
          className="d-block w-100"
          src={`/img/${nvda}`}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>ASUS 30 Series</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={CAROUSEL_TIME}>
        <img
          className="d-block w-100"
          src={`/img/${asus}`}
          alt="Nvidia Founders Edition"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainCarousel;
