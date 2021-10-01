import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useMediaQuery } from "../utils/useMediaQuery";
import { getCartSubtotal, getToken } from "../utils/utils";
import { getUserIdFromToken } from "../utils/utils";
import { getAddressesFromUser } from "../fetches/userFetch";

import {
  firstNameValidation,
  lastNameValidation,
  streetAddressValidation,
  cityValidation,
  zipCodeValidation,
} from "./validators/addressValidator";
import { createAddress } from "../fetches/userFetch";
import ValidateMessage from "../component/ValidateMessage";
import { stateoptions } from "../utils/constants";

import "../css/User.css";
import "../css/Checkout.css";
import "rodal/lib/rodal.css";
import CreditCardForm from "./creditcard/CreditCardForm";

const _ = require("lodash");

function Checkout({ cart }) {
  const [width] = useMediaQuery();
  const [shippingAddress, setShippingAddress] = useState({});
  const [addressCount, setAddressCount] = useState();
  const [shippingOption, setShippingOption] = useState({
    type: "FREE",
    price: 0,
  });
  const [showModal, setshowModal] = useState(false);
  const token = getToken();
  const userid = getUserIdFromToken(token);
  const componentheightInRem = (width) => {
    return ((width * 0.33) / 16).toString() + "rem";
  };

  let subtotal = getCartSubtotal(cart);
  let shippingoptions = [
    { type: "FREE", label: "Free 7 Day", price: 0 },
    { type: "2DAY", label: "2 Day", price: (subtotal * 0.02).toFixed(2) },
    {
      type: "OVERNIGHT",
      label: "Overnight",
      price: (subtotal * 0.04).toFixed(2),
    },
    {
      type: "SAMEDAY",
      label: "Same Day",
      price: (subtotal * 0.12).toFixed(2),
    },
  ];

  const testHandler = (value) => {
    alert(value.number);
  };
  const AddressForm = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [unit, setUnit] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipCode] = useState("");

    const [firstnamemessage, setFirstNameMessage] = useState("");
    const [lastnamemessage, setLastNameMessage] = useState("");
    const [streetaddressmessage, setStreetAddressMessage] = useState("");
    const [citymessage, setCityMessage] = useState("");
    const [zipcodemessage, setZipCodeMessage] = useState("");
    const authtoken = getToken();
    const userid = getUserIdFromToken(authtoken);

    const [addressclasses, setAddressesClasses] = useState("mb-3");

    const submit = async (event) => {
      event.preventDefault();

      const firstnameerror = firstNameValidation(firstname);
      const lastnameerror = lastNameValidation(lastname);
      const streetaddresserror = streetAddressValidation(address);
      const cityerror = cityValidation(city);
      const zipcodeerror = zipCodeValidation(zipcode);

      firstnameerror
        ? setFirstNameMessage(firstnameerror)
        : setFirstNameMessage("");
      lastnameerror
        ? setLastNameMessage(lastnameerror)
        : setLastNameMessage("");

      if (streetaddresserror) {
        setStreetAddressMessage(streetaddresserror);
        setAddressesClasses("mb-1");
      } else {
        setStreetAddressMessage("");
        setAddressesClasses("mb-3");
      }
      cityerror ? setCityMessage(cityerror) : setCityMessage("");
      zipcodeerror ? setZipCodeMessage(zipcodeerror) : setZipCodeMessage("");

      if (
        firstnameerror ||
        lastnameerror ||
        streetaddresserror ||
        cityerror ||
        zipcodeerror
      )
        return;

      const newaddress = {
        firstname: firstname,
        lastname: lastname,
        address: address,
        unit: unit,
        city: city,
        state: state,
        zipcode: zipcode,
      };

      //First time checking out and no addresses on file
      if (addressCount === 0) {
        //Create same address twice, as primary and default shipping
        await createAddress(userid, token, newaddress);
        const result = await createAddress(userid, token, newaddress);
        setAddressCount(result.addresses.length);
        setShippingAddress(result.addresses[1]);
      }

      //One address on record, being the primary address, create new Address and set it as Shipping Address
      if (addressCount === 1) {
        const result = await createAddress(userid, token, newaddress);
        setShippingAddress(result.addresses[1]);
        setAddressCount(result.addresses.length);
      }

      //If Primary Address and Default Shipping Address exists, set temporary shipping address from user input
      if (addressCount > 1) {
        setShippingAddress(newaddress);
      }
      setshowModal(false);
    };
    return (
      <div className="user">
        <div className="user-container" style={{ border: "1px solid white" }}>
          <h3>Create address</h3>
          <Form>
            <h6>First Name</h6>
            <input
              className="mb-1"
              value={firstname}
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
            />
            <ValidateMessage message={firstnamemessage} />
            <h6>Last Name</h6>
            <input
              className="mb-1"
              value={lastname}
              onChange={(event) => setLastName(event.target.value)}
              type="text"
            />
            <ValidateMessage message={lastnamemessage} />
            <h6>Address</h6>
            <input
              className={addressclasses}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              type="text"
            />
            <ValidateMessage message={streetaddressmessage} />
            <input
              className="mb-1"
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              type="text"
              placeholder="Apt #, Suite, Floor (optional)"
            />
            <h6>City</h6>
            <input
              className="mb-1"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              type="text"
            />
            <ValidateMessage message={citymessage} />
            <h6>State</h6>

            <select
              value={state}
              className="all-dropdown mb-1"
              onChange={(event) => setState(event.target.value)}
            >
              {stateoptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <h6>Zip Code</h6>
            <input
              className="mb-1"
              value={zipcode}
              onChange={(event) => setZipCode(event.target.value)}
              type="text"
            />

            <ValidateMessage message={zipcodemessage} />
            <div>
              <button
                className="user-button"
                onClick={(event) => {
                  submit(event);
                }}
              >
                Create
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAddressesFromUser(userid, token);
      if (result.success) {
        result.addresses.length > 1
          ? setShippingAddress(result.addresses[1])
          : setShippingAddress(result.addresses[0]);
      }
      setAddressCount(result.addresses.length);
    };
    fetchData();
  }, [token, userid, setShippingAddress]);

  const openRodal = () => {
    setshowModal(true);
  };

  const closeRodal = () => {
    setshowModal(false);
  };

  const tabalateShipping = (value) => {
    setShippingOption({ type: value.type, price: value.price });
  };

  return (
    <div
      className="checkout-main"
      style={{ minHeight: componentheightInRem(width) }}
    >
      <div className="mt-2" style={{ width: "100%", height: "5rem" }}>
        <p className="tall-font">Review and place your order</p>
      </div>
      <div className="d-flex flex-row" style={{ width: "100%" }}>
        <div style={{ width: "65%" }}>
          <div className="d-flex flex-row shadow p-2 mb-4 bg-white rounded">
            <div className="d-flex flex-column m-1" style={{ width: "54%" }}>
              <h6 className="font-weight-bold">Shipping Information</h6>

              {!_.isEmpty(shippingAddress) && (
                <div>
                  <div className="h6 mb-0 text-capitalize">
                    {shippingAddress.firstname}&nbsp;
                    {shippingAddress.lastname}
                  </div>
                  <div className="text-uppercase lh">
                    <small>{shippingAddress.address}</small>
                  </div>
                  <div>
                    <small className="text-uppercase lh">
                      {shippingAddress.unit}
                    </small>
                  </div>
                  <div className="text-uppercase font-weight-bold lh">
                    <small>
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.zipcode}
                    </small>
                  </div>
                </div>
              )}
              <div className="mt-2">
                <small className="text-primary clickable" onClick={openRodal}>
                  {addressCount > 1
                    ? "Change shipping address"
                    : "Add new address"}
                </small>
              </div>
            </div>
            <div className="d-flex flex-column" style={{ width: "25%" }}>
              <Form>
                <Form.Label>
                  <h6 className="font-weight-bold mt-1">Choose shipping</h6>
                </Form.Label>

                <div key={`default-radio`} className="mb-2">
                  {shippingoptions.map((option) => (
                    <Form.Check
                      onChange={(event) =>
                        tabalateShipping(
                          shippingoptions.find(
                            (x) => x.type === event.target.value
                          )
                        )
                      }
                      type="radio"
                      id={option.type}
                      name="shipping-option"
                      label={option.label}
                      value={option.type}
                      defaultChecked={option.type === "FREE" ? true : false}
                    />
                  ))}
                </div>
              </Form>
            </div>
            <div className="d-flex flex-column" style={{ width: "auto" }}>
              <div className="mb-3">&nbsp;</div>
              {shippingoptions.map((option) => (
                <span className="font-weight-bold">
                  {option.price === 0 ? "FREE" : `$${option.price}`}
                </span>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column shadow p-2 mb-4 bg-white rounded">
            <div className="font-weight-bold mb-1">Payment Information</div>

            <CreditCardForm />
          </div>
        </div>
        <Rodal
          visible={showModal}
          onClose={closeRodal}
          measure="px"
          width={380}
          height={640}
          animation="fade"
          customStyles={{
            border: "1px solid #c9a0dc",
            borderRadius: "5px",
          }}
        >
          <AddressForm />
        </Rodal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Checkout);
