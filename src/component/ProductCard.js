import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addToCart, resetCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import "../css/ProductCard.css";

function ProductCard(props) {
  const id = props.product._id;
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

  const dispatch = useDispatch();

  return (
    <Card className="product-card" id={id}>
      <Link to={`/product/${id}`}>
        <Card.Img variant="top" src={`/img/${imgurl}`} />
      </Link>
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
          <Button
            className="button-cart"
            id={IdleDeadline}
            // onClick={() => {
            //   dispatch(resetCart());
            // }}
            onClick={() => {
              dispatch(addToCart(props.product._id, props.product.price));
            }}
          >
            {buttontext}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
