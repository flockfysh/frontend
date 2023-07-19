import React, { useEffect } from "react";
import { useRef } from "react";

const PayPal = () => {
  const paypal = useRef();
  paypal.current = undefined;

  const renderingPaypal = () => {
    const paymentAmount = 20;
    const commisionAmount = paymentAmount * 1.2;
    console.log("inside");
    window?.paypal
      .Buttons({
        createOrder: (data: any, actions: any, err: any) => {
          return actions.order.create({
            intent: "CAPTURE",

            headers: {
              Accept: "application/json",
              encType: "application/json",
              rel: "information_link",
            },
            purchase_units: [
              {
                description: "Product description",
                amount: {
                  currency: "USD",
                  currencyCode: "USD",
                  value: commisionAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log(order, "order->>");
        },
        onError: (err: any) => {
          console.log(err);
          // toast.error("Something went wrong........",err)
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
      <div ref={paypal} style={{ width: "500px" }}></div>
    </div>
  );
};

export default PayPal;
