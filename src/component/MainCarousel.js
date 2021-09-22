import React from "react";
import { Carousel } from "react-bootstrap";
import msi from "../assets/msi-image.jpg";
import nvda from "../assets/nvd-image.jpg";
import asus from "../assets/asus-image.JPG";
import { CAROUSEL_TIME } from "../utils/constants";

function MainCarousel(props) {
  return (
    <Carousel
      style={{
        background: "white",
      }}
    >
      <Carousel.Item interval={CAROUSEL_TIME}>
        <img className="d-block w-100" src={msi} alt="First slide" />
        <Carousel.Caption>
          <h3>MSI Exclusive Ampere</h3>
          <p>Ray Tracying Enabled</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={CAROUSEL_TIME}>
        <img className="d-block w-100" src={asus} alt="Second slide" />
        <Carousel.Caption>
          <h3>ASUS 30 Series</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={CAROUSEL_TIME}>
        <img
          className="d-block w-100"
          src={nvda}
          alt="Nvidia Founders Edition"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainCarousel;
