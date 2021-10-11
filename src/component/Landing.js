import React from "react";
import { Link } from "react-router-dom";
import "../css/Landing.css";
import MainCarousel from "./MainCarousel";
import { useMediaQuery } from "../utils/useMediaQuery";

function Landing() {
  const [width] = useMediaQuery();
  const componentwidthInRem = (width) => {
    return navigator.platform === "MacIntel"
      ? ((width * 0.64) / 16).toString() + "rem"
      : ((width * 0.42) / 16).toString() + "rem";
  };

  const frameDimension = (width) => {
    return navigator.platform === "MacIntel"
      ? {
          framewidth: (width * 0.26).toString(),
          frameheight: (width * 0.16).toString(),
        }
      : {
          framewidth: (width * 0.13).toString(),
          frameheight: (width * 0.08).toString(),
        };
  };

  const spantext = "d-flex justify-content-center font-weight-bold text-dark";

  return (
    <div className="landing" style={{ width: componentwidthInRem(width) }}>
      <div>
        <MainCarousel />
      </div>
      <div className="landing-rectangle">
        <div className="m-2">
          <iframe
            width={frameDimension(width).framewidth}
            height={frameDimension(width).frameheight}
            src="https://www.youtube-nocookie.com/embed/xg0FI4QX8eQ?controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>{" "}
        <div className="mt-auto mb-auto">
          <p style={{ fontSize: "1rem" }}>Unboxing of the Geforce RTX 3080!</p>
          <Link to="/product/614c11b6dcdeb36321f5b2c6" className="text-primary">
            <p style={{ fontSize: "1.2rem" }}>
              Check out ASUS Geforce RTX 3080 Ti!
            </p>
          </Link>
        </div>
      </div>
      {/* <div className="d-flex flex-column">
        <div width="100%">
          <p className="tall-font">Shop Video Cards</p>
        </div>
        <div className="d-flex flex-row">
          <div className="right-border d-flex justify-content-center">
            <Link to="/products">
              <img
                src="/img/enthusiasts.jpg"
                style={{ maxWidth: "100%" }}
                alt="Enthusiasts Cards"
              />
              <span className={spantext}>Enthusiast</span>
            </Link>
          </div>
          <div className="right-border d-flex justify-content-center">
            <Link to="/products">
              <img
                src="/img/performance.jpg"
                style={{ maxWidth: "100%" }}
                alt="Performance cards"
              />
              <span className={spantext}>Performance</span>
            </Link>
          </div>
          <div className="right-border d-flex justify-content-center">
            <Link to="/products">
              <img
                src="/img/mainstream.jpg"
                style={{ maxWidth: "100%" }}
                alt="Mainstream cards"
              />
              <span className={spantext}>Mainstream</span>
            </Link>
          </div>
          <div className="ml-1 d-flex justify-content-center">
            <Link to="/products">
              <img
                src="/img/lowprofile.jpg"
                style={{ maxWidth: "100%" }}
                alt="Low Profile cards"
                label="Low Profile cards"
              />
              <span className={spantext}>Budget</span>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Landing;
