import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addToCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import "../css/ProductCard.css";

function ProductCard(props) {
  const text = "Add to cart";
  const history = useHistory();
  const dispatch = useDispatch();
  const [spinner, setspinner] = useState(
    "spinner-border spinner-border-sm d-none"
  );

  const [buttontext, setbuttontext] = useState(text);

  const id = props.product._id;
  let card = props.product.images.find((image) => {
    return image.type === "card";
  });

  const imgurl = card === undefined ? "nvidiageneric.jpg" : card.url;

  let brandLogo = props.product.images.find((image) => {
    return image.type === "brandsmall";
  });

  brandLogo = brandLogo === undefined ? "BrandNvidia.gif" : brandLogo.url;

  const sendToCart = () => {
    setbuttontext("");
    setspinner("spinner-border spinner-border-sm");

    setTimeout(() => {
      setbuttontext(text);
      setspinner("spinner-border spinner-border-sm d-none");
      dispatch(
        addToCart(
          props.product._id,
          props.product.name,
          imgurl,
          props.product.price,
          1
        )
      );
    }, 500);
  };

  return (
    <Card className="product-card" id={id}>
      <Link to={`/product/${id}`}>
        <Card.Img
          variant="top"
          src={`${process.env.REACT_APP_IMG_URL}/${imgurl}`}
        />
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
        <Card.Img
          className="brand-logo"
          src={`${process.env.REACT_APP_IMG_URL}/${brandLogo}`}
          style={{ width: "4rem" }}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title
          className="h6 fw-800 card-font"
          onClick={() => history.push(`/product/${id}`)}
        >
          {props.product.name}
        </Card.Title>
        <div className="bottom-card">
          <Card.Text>${props.product.price}</Card.Text>
          {props.product.quantity === 0 && (
            <Button
              className="btn"
              style={{ minWidth: "7rem" }}
              variant="danger"
            >
              Out of Stock
            </Button>
          )}
          {props.product.quantity > 1 && (
            <Button
              className="btn button-cart"
              style={{ minWidth: "7rem" }}
              onClick={() => {
                sendToCart();
              }}
            >
              <span className={spinner} role="status" aria-hidden="true"></span>
              {buttontext}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
