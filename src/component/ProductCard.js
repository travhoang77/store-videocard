import React from "react";
import { Card, Button } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import "../css/ProductCard.css";

function ProductCard(props) {
  const img = "img/evga_3070xc3.jpg";
  const brandLogo = "img/brandEVGA.png";
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={img} />
      <Card.Header>
        <span className="product-rating">
          <span className="rating-star">&#9734;</span>
          <span className="rating-star">&#9734;</span>
          <span className="rating-star">&#9734;</span>
          <span className="rating-star">&#9734;</span>
          <span className="rating-star">&#9734;</span>
        </span>
        <Card.Img className="brand-logo" src={brandLogo} />
      </Card.Header>
      <Card.Body>
        <Card.Title className="h6 fw-800 card-font">
          EVGA Geforce RTX 3070 XC3 ULTRA
        </Card.Title>
        <Card.Subtitle>
          08G-P5-3755-KR, 8GB GDDR6, iCX3 Cooling, ARGB LED, Metal Backplate
        </Card.Subtitle>

        <Card.Text className="mt-2">
          <h4>$199.99</h4>
        </Card.Text>
        <p className="out-of-stock text-danger">Out of stock</p>
        <Button className="button-cart">Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
