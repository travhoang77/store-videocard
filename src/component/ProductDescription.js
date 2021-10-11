import React, { useEffect, useState, useLayoutEffect } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Counter from "./Counter";
import { getProductBy } from "../fetches/productFetch";
import { CART_LIMIT } from "../utils/constants";
import _ from "lodash";
import { addToCart, adjustQty } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import store from "../redux/store";
import { useMediaQuery } from "../utils/useMediaQuery";
import "../css/ProductDescription.css";

function ProductDescription(props) {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };
  const text = "Add to cart";
  useLayoutEffect(() => {
    //ensure page renders at thge top
    window.scrollTo(0, 0);
  });
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [spinner, setspinner] = useState(
    "spinner-border spinner-border-sm d-none"
  );

  const [buttontext, setbuttontext] = useState(text);
  const dispatch = useDispatch();

  const msrp = "h3 text-danger mr-4 d-none";
  let state = store.getState();
  const item = state.cart.cart.find((item) => item.id === id);

  const [qty, setqty] = useState(item ? item.qty : 1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductBy(id);
      if (result.success) {
        setProduct(result.product);
      }
    };
    fetchData();
  }, [id]);

  const description = _.isEmpty(product) ? "description d-none" : "description";
  const rating = product.rating ? product.rating : 0;
  const features = product.features ? product.features : [];

  const image = _.isEmpty(product)
    ? undefined
    : product.images.find((image) => {
        return image.type === "main";
      });

  const cardimage = _.isEmpty(product)
    ? undefined
    : product.images.find((image) => {
        return image.type === "card";
      });

  const imgurl = _.isUndefined(image) ? "nvidiageneric.jpg" : image.url;
  const cardimgurl = _.isUndefined(image) ? "nvidiageneric.jpg" : cardimage.url;

  const handleCounter = (value) => {
    setqty(value);
  };

  const sendToCart = () => {
    setbuttontext("");
    setspinner("spinner-border spinner-border-sm");

    setTimeout(() => {
      setbuttontext(text);
      setspinner("spinner-border spinner-border-sm d-none");
      item
        ? dispatch(adjustQty(id, qty))
        : dispatch(addToCart(id, product.name, cardimgurl, product.price, qty));
    }, 500);
  };

  return (
    <div style={{ minHeight: componentheightInRem(width) }}>
      <div className={description}>
        <div className="float-left">
          <Image
            src={`${process.env.REACT_APP_IMG_URL}/${imgurl}`}
            style={{ maxWidth: "26rem" }}
            className="border-0"
            thumbnail
          />
        </div>
        <div className="mx-auto">
          <h4>{product.name}</h4>
          <p>{product.subtitle}</p>
          <div>
            {Array(rating)
              .fill()
              .map((_) => (
                <span className="description-rating-star">&#9733;</span>
              ))}
            {Array(5 - rating)
              .fill()
              .map((_) => (
                <span className="description-rating-star">&#9734;</span>
              ))}
          </div>
          <ul className="ml-4" style={{ minHeight: "12rem" }}>
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          {product.quantity > 0 && CART_LIMIT > 1 && (
            <Counter
              limit={CART_LIMIT}
              value={item ? item.qty : 1}
              onUpdate={handleCounter}
            />
          )}
          <div className="mt-2">
            <span className={msrp}>
              $<del></del>
            </span>
            <span className="h3">${product.price}</span>
          </div>

          {product.quantity > 0 && (
            <Button
              className="button-cart mt-2"
              id={product._id}
              onClick={sendToCart}
              style={{ minWidth: "7rem" }}
            >
              <span className={spinner} role="status" aria-hidden="true"></span>
              {buttontext}
            </Button>
          )}

          {_.isEqual(product.quantity, 0) && (
            <Button className="mt-2" variant="danger">
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
