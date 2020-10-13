import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HC1HAIaM8iluQCW2RVLE0HbCpkFGMiLybPHytmw25Qczvyu1aTRWjxZKqtDSe4MOgMcKR0wWXDRpne0bLgxJPGN00eMXe3ByE";

  const onToken = (token) => {
    // console.log(token);
    // alert("Payment Successful");
    // axios is a func that receives an obj that has all of the properties that we want to pass
    axios({
      // will automatically know that we're making a req to our own /payment route in server.js
      url: 'payment',
      // method property to let it know it's a post method
      method: 'post',
    //  data represents the data we're trying to pass through
      data: {
      amount: priceForStripe,
      token
      }
    }).then(response => {
      alert('Payment succesful')
    }).catch(error => {console.log('Payment error: ', JSON.parse(error));
alert('There was an issue with your payment. Please make sure you use the provided credit card')
  })}

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
