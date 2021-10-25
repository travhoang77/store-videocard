import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addToCart } from "../redux/actions/cartActions";
import { connect } from "react-redux";
import "../css/ProductCard.css";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinner: "spinner-border spinner-border-sm d-none",
      buttontext: "Add to cart",
    };
  }

  sendToCart = (id, name, imgurl, price) => {
    this.setState({ buttontext: "" });
    this.setState({ spinner: "spinner-border spinner-border-sm" });

    setTimeout(() => {
      this.setState({ buttontext: "Add to cart" });
      this.setState({ spinner: "spinner-border spinner-border-sm d-none" });
      this.props.onAddToCart(id, name, imgurl, price);
    }, 500);
  };

  render() {
    const { history } = this.props;
    let card = this.props.product.images.find((image) => {
      return image.type === "card";
    });

    const imgurl = card === undefined ? "nvidiageneric.jpg" : card.url;

    let brandLogo = this.props.product.images.find((image) => {
      return image.type === "brandsmall";
    });

    brandLogo = brandLogo === undefined ? "BrandNvidia.gif" : brandLogo.url;

    return (
      <>
        <Card className="product-card" id={this.props.product._id}>
          <Link to={`/product/${this.props.product._id}`}>
            <Card.Img
              variant="top"
              src={`${process.env.REACT_APP_IMG_URL}/${imgurl}`}
            />
          </Link>
          <Card.Header>
            <span>
              {Array(this.props.product.rating)
                .fill()
                .map((_) => (
                  <span className="rating-star">&#9733;</span>
                ))}
              {Array(5 - this.props.product.rating)
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
              onClick={() => history.push(`/product/${this.props.product._id}`)}
            >
              {this.props.product.name}
            </Card.Title>
            <div className="bottom-card">
              <Card.Text style={{ fontSize: "1.2rem" }}>
                ${this.props.product.price}
              </Card.Text>
              {this.props.product.quantity === 0 && (
                <Button
                  className="btn"
                  style={{ minWidth: "7rem" }}
                  variant="danger"
                >
                  Out of Stock
                </Button>
              )}
              {this.props.product.quantity > 1 && (
                <Button
                  className="btn button-cart"
                  style={{ minWidth: "7rem" }}
                  onClick={() => {
                    this.sendToCart(
                      this.props.product._id,
                      this.props.product.name,
                      imgurl,
                      this.props.product.price
                    );
                  }}
                >
                  <span
                    className={this.state.spinner}
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {this.state.buttontext}
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (id, name, imgurl, price) => {
      dispatch(addToCart(id, name, imgurl, price, 1));
    },
  };
};

export default connect((state) => {}, mapDispatchToProps)(
  withRouter(ProductCard)
);
