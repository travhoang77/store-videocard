import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import "./css/Footer.css";

function Footer(props) {
  return (
    <div className="myfooter mt-4">
      <footer className="text-center text-lg-start text-light">
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div class="me-5 d-none d-lg-block"></div>

          <div>
            {/* <a href="" class="me-4 text-reset">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-github"></i>
            </a> */}
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  <FontAwesomeIcon icon={faGem} className="mr-1" />
                  GPU World
                </h6>
                <p>GPU at amazing prices.</p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  Partners
                </h6>
                <p>
                  <a href="#!">Nvidia</a>
                </p>
                <p>
                  <a href="#!">AMD</a>
                </p>
                <p>
                  <a href="#!">Intel</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  Useful links
                </h6>
                <p>
                  <a href="#!">About</a>
                </p>
                <p>
                  <a href="#!">Settings</a>
                </p>
                <p>
                  <a href="#!">Orders</a>
                </p>
                <p>
                  <a href="#!">Help</a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  Contact
                </h6>
                <p>
                  <i>
                    <FontAwesomeIcon className="mr-3" icon={faHome} />
                  </i>
                  San Jose, CA 95111
                </p>
                <p>
                  <i>
                    <FontAwesomeIcon className="mr-3" icon={faEnvelope} />
                  </i>
                  info@gpuworld.com
                </p>
                <p>
                  <i>
                    <FontAwesomeIcon className="mr-3" icon={faPhone} />
                  </i>{" "}
                  + 01 555-555-5555
                </p>
                <p>
                  <i>
                    <FontAwesomeIcon className="mr-3" icon={faPrint} />
                  </i>{" "}
                  + 01 555-555-5555
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">
          {/* © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a> */}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
