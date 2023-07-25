import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {stripePromise} from '@/settings'
import CheckoutForm from './CheckoutForm';
import { Router, useRouter } from 'next/router';
import { StripeElementsOptions } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


function Checkout() {

    const router = useRouter()

    console.log('client',router.query.client)
    const options:any = {
        // passing the client secret obtained in step 3
        clientSecret: router.query.clientSecret,
        // Fully customizable with appearance API.
    //    appearance: {/*...*/},
    };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout