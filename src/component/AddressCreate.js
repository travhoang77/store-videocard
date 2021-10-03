import React, { useState } from "react";

import { Form } from "react-bootstrap";

import {
  firstNameValidation,
  lastNameValidation,
  streetAddressValidation,
  cityValidation,
  zipCodeValidation,
} from "./validators/addressValidator";
import { createAddress } from "../fetches/userFetch";
import ValidateMessage from "../component/ValidateMessage";
import "../css/User.css";
import { getToken, getUserIdFromToken } from "../utils/utils";
import { useHistory } from "react-router-dom";

import { stateoptions } from "../utils/constants";
import { useMediaQuery } from "../utils/useMediaQuery";

function AddressCreate() {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };
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
  const history = useHistory();

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

    const newaddress = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      unit: unit,
      city: city,
      state: state,
      zipcode: zipcode,
    };
    const result = await createAddress(userid, authtoken, newaddress);

    if (result.success) {
      history.push("/account/addresses");
    } else alert("Address was not created");
  };

  return (
    <div className="user" style={{ minHeight: componentheightInRem(width) }}>
      <div className="user-container">
        <h3>Create address</h3>
        <Form onSubmit={(event) => submit(event)}>
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
              <option value={option.value}>{option.label}</option>
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
            <button type="submit" className="user-button">
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddressCreate;
