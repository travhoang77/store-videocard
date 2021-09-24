import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getToken, getUserIdFromToken } from "../utils/utils";
import { CircleLoader } from "react-spinners";
import {
  getAddressesFromUser,
  deleteAddressFromUser,
  setDefaultShipppingAddressById,
} from "../fetches/userFetch";

import "../css/Addresses.css";
import AddAddressCard from "./AddAddressCard";
import AddressCard from "./AddressCard";
import { spinnerduration } from "../utils/constants";
const _ = require("lodash");

function Addresses(props) {
  const maximum = props.maximum ? props.maximum : 2;

  const [shippingAddressContent, setShippingAddressContent] =
    useState("shipping-addresses");
  const [addresscount, setAddressCount] = useState(0);
  const [primaryaddress, setPrimaryAddress] = useState({});
  const [defaultShippingAddresss, setDefaultShippingAddress] = useState({});
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const token = getToken();
  const userid = getUserIdFromToken(token);
  const spinnercolor = "#190061";
  const [showSpinner, setShowSpinner] = useState(false);
  const history = useHistory();
  const primaryAddressExist = useCallback(() => {
    return !_.isEmpty(primaryaddress);
  }, [primaryaddress]);
  //useCallback to prevent flickering

  const handleChange = (addressid) => {
    history.push(`/account/addresses/update/${addressid}`);
  };

  const PrimaryAddress = useCallback(
    (props) => {
      return primaryAddressExist ? (
        <AddressCard
          type="primary"
          object={props.address}
          key={props.address._id}
          onUpdate={() => {
            history.push(`/account/addresses/update/${props.address._id}`);
          }}
        />
      ) : (
        <AddAddressCard />
      );
    },
    [primaryAddressExist, history]
  );

  const runSpinner = () => {
    setShowSpinner(true);
    setShippingAddressContent("d-none");
    setTimeout(() => {
      setShowSpinner(false);
      setShippingAddressContent("shipping-addresses");
    }, spinnerduration);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAddressesFromUser(userid, token);
      if (result.success) {
        if (result.addresses) {
          setAddressCount(result.addresses.length);
          if (result.addresses.length > 0)
            setPrimaryAddress(result.addresses[0]);
          if (result.addresses.length > 1)
            setDefaultShippingAddress(result.addresses[1]);
          if (result.addresses.length > 2)
            setShippingAddresses(
              result.addresses.slice(
                2,
                result.addresses.length > maximum
                  ? maximum
                  : result.addresses.length
              )
            );
        }
      }
    };
    fetchData();
  }, [maximum, userid, token]);

  const handleDelete = async (addressid) => {
    const results = await deleteAddressFromUser(addressid, userid, token);
    if (results.success) {
      // runSpinner();
      setAddressCount(results.addresses.length);
      if (results.addresses.length === 1) {
        setDefaultShippingAddress({});
        setShippingAddresses([]);
      }
      if (results.addresses.length > 1) {
        setDefaultShippingAddress(results.addresses[1]);
        setShippingAddresses(results.addresses.slice(2));
      }
    } else alert("Action Failed");
  };

  const handleSetDefault = async (addressid) => {
    const results = await setDefaultShipppingAddressById(
      addressid,
      userid,
      token
    );
    if (results.success) {
      // runSpinner();

      setDefaultShippingAddress(results.addresses[1]);
      setShippingAddresses(results.addresses.slice(2));
    } else alert("Action Failed");
  };

  return (
    <div style={{ minHeight: "42rem" }}>
      <div className="addresses">
        <span style={{ width: "100%", height: "3rem" }}>
          <h4 className="border-dark border-bottom">Addresses</h4>
        </span>
        <span style={{ width: "100%", height: "4rem" }}>
          <h6 className="mb-0">Primary</h6>
          <small>
            Your main address with us. This is so we know how to reach you.
          </small>
        </span>
        <span className="mb-3">
          {primaryaddress && <PrimaryAddress address={primaryaddress} />}
        </span>

        {addresscount > 0 && (
          <span style={{ width: "100%", height: "2rem" }}>
            <h6>Shipping</h6>
          </span>
        )}

        <div className={shippingAddressContent}>
          {defaultShippingAddresss && !_.isEmpty(defaultShippingAddresss) && (
            <span className="shipping-address">
              <AddressCard
                key={defaultShippingAddresss._id}
                type="shippingdefault"
                object={defaultShippingAddresss}
                onUpdate={handleChange}
                onDelete={handleDelete}
              />
            </span>
          )}
          {shippingAddresses &&
            shippingAddresses.map((object) => (
              <span className="shipping-address">
                <AddressCard
                  key={object._id}
                  type="shipping"
                  object={object}
                  onUpdate={handleChange}
                  onDelete={handleDelete}
                  onSetDefault={handleSetDefault}
                />
              </span>
            ))}
          {!_.isEqualWith(addresscount, 0) && addresscount < maximum && (
            <span className="shipping-address">
              <AddAddressCard />
            </span>
          )}
        </div>
      </div>
      <div className="spinner">
        <CircleLoader size={60} color={spinnercolor} loading={showSpinner} />
      </div>
    </div>
  );
}

export default Addresses;
