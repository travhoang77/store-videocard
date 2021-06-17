import React from "react";
import { Card, Button } from "react-bootstrap";
import "../css/ProductCard.css";

function ProductCard(props) {
  let card = props.product.images.find((image) => {
    return image.type === "card";
  });

  card = card === undefined ? "nvidiageneric.jpg" : card.url;

  let brandLogo = props.product.images.find((image) => {
    return image.type === "brandsmall";
  });

  brandLogo = brandLogo === undefined ? "BrandNvidia.gif" : brandLogo.url;

  const buttontext =
    props.product.quantity === 0 ? "Out of Stock" : "Add to cart";

  return (
    <Card
      className="product-card"
      id={props.product._id}
      key={props.product._id}
    >
      <Card.Img variant="top" src={`/img/${card}`} />
      <Card.Header>
        <span className="product-rating">
          {Array(props.product.rating)
            .fill()
            .map((_) => (
              <span className="rating-star">&#9733;</span>
            ))}
          {Array(5 - props.product.rating)
            .fill()
            .map((_) => (
              <span className="rating-star">&#9734;</span>
            ))}
        </span>
        <Card.Img className="brand-logo" src={`/img/${brandLogo}`} />
      </Card.Header>
      <Card.Body>
        <Card.Title className="h6 fw-800 card-font">
          {props.product.name}
        </Card.Title>
        <div className="bottom-card">
          <Card.Text>
            <h4>${props.product.price}</h4>
          </Card.Text>
          <Button className="button-cart" id={props.product._id}>
            {buttontext}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
