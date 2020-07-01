import React from 'react';
// import CheckoutForm from './Checkout'
import { useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import '../fonts/stylesheet.css';
import '../CardSectionStyles.css'

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        // fontFamily: 'Times New Roman',
        // fontFamily: "atari_classicchunky",
        // fontFamily: 'Times New Roman',
        fontFamily: 'Atari',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

const CheckoutForm = props => {
    const stripe = useStripe();
    const elements = useElements();

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }


        const resp = await fetch(`http://localhost:3001/secret/${props.amount*100}`)
        const secret = await resp.json()
        // console.log(secret);
        const result = await stripe.confirmCardPayment(secret.client_secret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
            name: 'Jenny Rosen',
            },
        }
        });
    
        if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          console.log(result.paymentIntent.amount);
          props.addChips(result.paymentIntent.amount*100)
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          console.log("PAYMENT SUCCESS");
            // send post request to add chips to person's account.
        }
        }
    }
    
    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    Card details
                    <CardElement options={CARD_ELEMENT_OPTIONS}/>
                    {/* <CardElement /> */}

                    {/* <CardNumberElement /> */}
                    {/* <CardExpiryElement /> */}
                    {/* <CardCvcElement /> */}
                </label><br/>
                <input type="submit" value="Deposit 10 Dollars"/>
            </form>
        </div>
    )
    
}

export default CheckoutForm;