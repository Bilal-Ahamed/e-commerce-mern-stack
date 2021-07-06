import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../action/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // when a user don't type any value of address then redirect back to the shipping screen
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const { userInfo } = useSelector((state) => state.userSignin);

  // when a user log out, redirect user to the home screen
  if (!userInfo) {
    props.history.push("/");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div className="">
          <h1>Payment</h1>
        </div>
        <div className="direction-row">
          <input
            className="radio"
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div className="direction-row">
          <input
            className="radio"
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="stripe">Stripe</label>
        </div>

        <div className="">
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;
