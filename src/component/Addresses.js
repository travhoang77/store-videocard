import React, { useEffect, useState, useCallback } from "react";
import { getToken, getUserIdFromToken } from "../utils/utils";
import { getAddressesFromUser } from "../fetches/userFetch";

import "../css/Addresses.css";
import AddAddressCard from "./AddAddressCard";
import AddressCard from "./AddressCard";
const _ = require("lodash");

function Addresses(props) {
  const maximum = props.maximum ? props.maximum : 2;
  const [addresscount, setAddressCount] = useState(0);
  const [primaryaddress, setPrimaryAddress] = useState({});
  const [defaultShippingAddresss, setDefaultShippingAddress] = useState({});
  const [shippingAddresses, setShippingAddresses] = useState([]);

  const primaryAddressExist = () => {
    return !_.isEmpty(primaryaddress);
  };

  const PrimaryAddress = useCallback(
    (props) => {
      return primaryAddressExist ? (
        <AddressCard type="primary" object={props.address} />
      ) : (
        <AddAddressCard />
      );
    },
    [primaryAddressExist]
  );

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      const userid = getUserIdFromToken(token);

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
  }, []);

  return (
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

      {defaultShippingAddresss && !_.isEmpty(defaultShippingAddresss) && (
        <span className="shipping-address">
          <AddressCard
            type="shippingdefault"
            object={defaultShippingAddresss}
          />
        </span>
      )}
      {shippingAddresses &&
        shippingAddresses.map((object) => (
          <span className="shipping-address">
            <AddressCard type="shipping" object={object} />
          </span>
        ))}
      {!_.isEqualWith(addresscount, 0) && addresscount < maximum && (
        <span className="shipping-address">
          <AddAddressCard />
        </span>
      )}
    </div>
  );
}

export default Addresses;
