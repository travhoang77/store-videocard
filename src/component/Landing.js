import React from "react";
import { Link } from "react-router-dom";
import "../css/Landing.css";
import MainCarousel from "./MainCarousel";

function Landing() {
  const spantext = "d-flex justify-content-center font-weight-bold text-dark";
  return (
    <div className="landing">
      <div>
        <MainCarousel />
      </div>
      <div className="landing-rectangle">
        <div className="m-2">
          <iframe
            width="448"
            height="252"
            src="https://www.youtube-nocookie.com/embed/lf1OWiTNY60?controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>{" "}
        <div className="mt-auto mb-auto">
          <p>Unboxing of the Geforce RTX 3080!</p>
        </div>
      </div>
      <div className="d-flex flex-column">
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
                src="/img/mainsttream.jpg"
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
      </div>
    </div>
  );
}

export default Landing;
