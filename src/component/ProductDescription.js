import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Counter from "./Counter";
import { getProductBy } from "../fetches/productFetch";
import _ from "lodash";
import "../css/ProductDescription.css";

function ProductDescription(props) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const msrp = "h3 text-danger mr-4 d-none";

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

  //Hard coded product limit for now
  const limit = 5;

  const image = _.isEmpty(product)
    ? undefined
    : product.images.find((image) => {
        return image.type === "main";
      });

  const imgurl = _.isUndefined(image) ? "nvidiageneric.jpg" : image.url;

  return (
    <div>
      <div className={description}>
        <div className="float-left">
          <Image
            src={`/img/${imgurl}`}
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
              <li>{feature}</li>
            ))}
          </ul>

          {product.quantity > 0 && limit > 1 && <Counter limit={limit} />}
          <div className="mt-2">
            <span className={msrp}>
              $<del></del>
            </span>
            <span className="h3">${product.price}</span>
          </div>

          {product.quantity > 0 && (
            <Button className="button-cart mt-2" id={product._id}>
              Add to Cart
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
