import ActionPopup from '@/components/ui/modals/actionPopup';
import React, { useEffect, useState } from 'react';
import classes from './styles.module.css';
import { useRouter } from 'next/router';
import api from '@/helpers/api';
import Auth from '@/helpers/auth';

function TwoFAReset() {

  const router = useRouter();

  const [qr, setQr] = useState<string>();
  const [error, setError] = useState<string>();

  const onClose= () => {

  };

  const fetchQR = async () => {
    const { email, token } = router.query as {email:string, token:string};

    const errCb = (msg:string) => {
      setError(msg);
    };

    if(email && token){
      const result = await Auth.resetOTP(email, token, errCb);
      result && setQr(result);
    }
  };

  const onDone = () => {
    router.replace('/');
  };

  useEffect(() => {
    fetchQR();
  }, []);
  

  return (
    <div>
        <ActionPopup
            blurBg={ true }
            hideClose
            disableOuterClick
            popupTitle={ 'Reset your OTP' }
            onClose={ onClose }
        >
          <div className={ classes.container }>
            <div>
              <p className={ classes.label }>Scan the QR code below to sync OTP with your Authenticator app.</p>
            </div>
            <div className={ classes.qrContainer }>
              { qr?<img className={ classes.qr } src={ qr } />:<p className={ classes.label }>{ error??'Generating QR code...' }</p> }
            </div>
            <button onClick={ onDone } className={ classes.done }>
              Done
            </button>
          </div>
        </ActionPopup>
    </div>
  );
}

export default TwoFAReset;
