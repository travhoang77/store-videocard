import React, { useState } from "react";
import { Form } from "react-bootstrap";
import SelectUSState from "react-select-us-states";
import Zip from "react-zipcode";
import {
  firstNameValidation,
  lastNameValidation,
  streetAddressValidation,
  cityValidation,
  zipCodeValidation,
} from "./validators/addressValidator";
import ValidateMessage from "../component/ValidateMessage";
import "../css/User.css";

function Address(props) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [unitAddress, setUnitAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");

  const [firstnamemessage, setFirstNameMessage] = useState("");
  const [lastnamemessage, setLastNameMessage] = useState("");
  const [streetaddressmessage, setStreetAddressMessage] = useState("");
  const [citymessage, setCityMessage] = useState("");
  const [zipcodemessage, setZipCodeMessage] = useState("");

  const [addressclasses, setAddressesClasses] = useState("mb-3");

  const save = (event) => {
    event.preventDefault();

    const firstnameerror = firstNameValidation(firstname);
    const lastnameerror = lastNameValidation(lastname);
    const streetaddresserror = streetAddressValidation(streetAddress);
    const cityerror = cityValidation(city);
    const zipcodeerror = zipCodeValidation(zipcode);

    firstnameerror
      ? setFirstNameMessage(firstnameerror)
      : setFirstNameMessage("");
    lastnameerror ? setLastNameMessage(lastnameerror) : setLastNameMessage("");

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
  };

  return (
    <div className="user">
      <div className="user-container">
        <h3>{props.label}</h3>
        <Form onSubmit={(event) => save(event)}>
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
            value={streetAddress}
            onChange={(event) => setStreetAddress(event.target.value)}
            type="text"
          />
          <ValidateMessage message={streetaddressmessage} />
          <input
            className="mb-1"
            value={unitAddress}
            onChange={(event) => setUnitAddress(event.target.value)}
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
          <SelectUSState
            value={state}
            className="mb-1 all-dropdown"
            onChange={(event) => setState(event.target.value)}
          />

          <h6>Zip Code</h6>
          <Zip
            value={zipcode}
            className="mb-1"
            onChange={(event) => setZipCode(event.target.value)}
          />
          <ValidateMessage message={zipcodemessage} />
          <div>
            <button type="submit" className="user-button">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Address;
