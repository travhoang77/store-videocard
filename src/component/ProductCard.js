import React from "react";
import { Card, Button } from "react-bootstrap";
import "../css/ProductCard.css";

function ProductCard(props) {
  const { id } = props;
  let card = props.product.images.find((image) => {
    return image.type === "card";
  });

  const imgurl = card === undefined ? "nvidiageneric.jpg" : card.url;

  let brandLogo = props.product.images.find((image) => {
    return image.type === "brandsmall";
  });

  brandLogo = brandLogo === undefined ? "BrandNvidia.gif" : brandLogo.url;

  const buttontext =
    props.product.quantity === 0 ? "Out of Stock" : "Add to cart";

  return (
    <Card className="product-card" id={id}>
      <Card.Img variant="top" src={`/img/${imgurl}`} />
      <Card.Header>
        <span>
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
          <Card.Text>${props.product.price}</Card.Text>
          <Button className="button-cart" id={id}>
            {buttontext}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
