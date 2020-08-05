import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/Carthelper";
import { getmeToken, processPayment } from "./helper/bpaymenthelper";
import { Link } from "react-router-dom";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

function BraintreeCheckout({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      console.log("INFORMATION", info);
      if (info?.err) {
        setInfo({ ...info, error: info.err });
      } else {
        const clientToken = info?.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={() => {}}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);
  return (
    <div>
      <h3>Test BT</h3>
      {showbtdropIn()}
    </div>
  );
}

export default BraintreeCheckout;
