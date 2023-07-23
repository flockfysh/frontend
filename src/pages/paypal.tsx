import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

function PayPal() {
  const paypal = useRef();
  paypal.current = undefined;

  const renderingPaypal = () => {
    const paymentAmount = 20;
    const commisionAmount = paymentAmount * 1.2;
    window?.paypal
      .Buttons({
        createOrder: (_data: any, actions: any, _err: any) => {
          return actions.order.create({
            intent: 'CAPTURE',

            headers: {
              Accept: 'application/json',
              encType: 'application/json',
              rel: 'information_link',
            },
            // eslint-disable-next-line camelcase
            purchase_units: [
              {
                description: 'Product description',
                amount: {
                  currency: 'USD',
                  currencyCode: 'USD',
                  value: commisionAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          order&& toast.success('Order Successfull');
        },
        onError: (err: any) => {
          toast.error(err);
        },
      })
      .render(paypal.current);
    // }
  };
  useEffect(() => {
    renderingPaypal();
  }, []);

  return (
    <div>
      <div ref={ paypal } style={ { width: '500px' } }></div>
    </div>
  );
}

export default PayPal;
