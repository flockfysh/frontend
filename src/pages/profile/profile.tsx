import { useContext } from 'react';

import { UserContext } from '../../contexts/userContext';

import classes from './profile.module.css';

export default function Profile() {
  const { curUser } = useContext(UserContext);

  return (
    <div className={ classes.containerDiv }>
      <div className={ classes.imageSection }>
        <h3 className={ classes.heading }>Your Account</h3>

        <div className={ classes.nameDiv }>
          <img className={ classes.image } src={ curUser!.profileImage } alt={ curUser!.name } />

          <div className={ classes.infoDiv }>
            <h4 className={ classes.name }>{ curUser!.name }</h4>

            <h6 className={ classes.email }>{ curUser!.email }</h6>
          </div>
        </div>
      </div>

      <div className={ classes.cardSection }>
        <div className={ classes.card }>
          <h5 className={ classes.cardHeading} >
            Total Monthly Cost <span>${ curUser!.monthlyCost.total }</span>
          </h5>

          {
            curUser!.monthlyCost.costs!.map(
              (cost, index) => (
                <p className={ classes.cardText } key={ index }>
                  { cost.description } <span className={ classes.price }>${ cost.amount }</span>
                </p>
              )
            )
          }
        </div>

        <div className={ classes.card }>
          <h5 className={ classes.cardHeading }>Payment History</h5>

          {
            curUser!.payments.map(
              (payment, index) => (
                <p className={ classes.cardText } key={ index }>
                  { payment.description } {' '}
                  <span className={ classes.price }>${ payment.amount }</span>
                </p>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}
