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
            <button className="btn btn-outline-success" onClick={onPurchase}>
              Pay with BrainTree
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

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info?.instance
      ?.requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData).then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("cart smptied!");
          });
          setReload(!reload);
        });
      })
      .catch((error) => {
        setInfo({ loading: false, success: false });
      });
  };
  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>BrainTree Checkout ${getAmount()}</h3>
      {showbtdropIn()}
    </div>
  );
}

export default BraintreeCheckout;
