import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { PayPalNamespace } from '@paypal/paypal-js';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  PayPalButtonsComponentProps
} from '@paypal/react-paypal-js';
import { PayPalScriptOptions } from '@paypal/paypal-js/types/script-options';

interface PayPalProps {
  amount: number;
  currency: string;
}

const paypalScriptOptions: PayPalScriptOptions = {
  clientId: 'AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl',
  currency: 'USD',
  intent: 'capture',
};


function Button({ amount, currency }:PayPalProps) {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    createOrder(data:any, actions:any) {
      return actions.order.create({
        purchase_units: [
          {
            description: 'This is a test description',
            amount: {
              value: amount,
              breakdown: {
                item_total: {
                  currency_code: currency,
                  value: amount
                }
              }
            }
            
          }
        ]
      });
    },
    onApprove(data:any, actions:any) {
      /**
       * data: {
       *   orderID: string;
       *   payerID: string;
       *   paymentID: string | null;
       *   billingToken: string | null;
       *   facilitatorAccesstoken: string;
       * }
       */
      return actions.order.capture({}).then((details: any) => {
        toast.success(
          'Transaction completed by' +
            (details?.payer.name.given_name ?? 'No details'));
      });
    },
    onError(err:any){
        toast.error(err);
    }, 
  };
  return (
    <>
      { isPending ? <h2>Load Smart Payment Button...</h2> : null }
      <PayPalButtons { ...paypalbuttonTransactionProps } />
    </>
  );
}

export default function PayPal(){
  return (
    <PayPalScriptProvider
      options={ paypalScriptOptions }
    >
    
      <Button amount = { 5 } currency="USD"/>

    </PayPalScriptProvider>
  );
}

