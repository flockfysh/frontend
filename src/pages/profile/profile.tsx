import { useContext } from 'react';

import UserPicture from '../../components/UI/currentUser/userPicture';
import UserName from '../../components/UI/currentUser/userName';
import UserEmail from '../../components/UI/currentUser/userEmail';
import Logout from '../../components/account/logout';

import { UserContext } from '../../contexts/userContext';

import classes from './profile.module.css';

export default function Profile() {
  const { curUser } = useContext(UserContext);

  if (!curUser!.payments) curUser!.payments = [];
  if (!curUser!.monthlyCost) curUser!.monthlyCost = { total: 0, storage: 0, creation: 0, costs: [] };

  return (
    <div className={ classes.containerDiv }>
      <div className={ classes.imageSection }>
        <div className={ classes.headingRow }>
          <h3 className={ classes.heading }>Your Account</h3>
          <Logout />
        </div>

        <div className={ classes.nameDiv }>
          <UserPicture className={ `${classes.image}` } />

          <div className={ classes.infoDiv }>
            <h4 className={ classes.name }>{<UserName />}</h4>
            <h6 className={ classes.email }>{<UserEmail />}</h6>
          </div>
        </div>
      </div>

      <div className={ classes.cardSection }>
        <div className={ classes.card }>
          <h5 className={ classes.cardHeading }>
            Total Monthly Cost <span>${curUser!.monthlyCost.total}</span>
          </h5>

          {
            curUser!.monthlyCost.costs!.map((cost, index) => (
              <p className={ classes.cardText } key={ index }>
                {cost.description}{' '}
                <span className={ classes.price }>${cost.amount}</span>
              </p>
            ))
          }
        </div>

        <div className={ classes.nameDiv }>
          <UserPicture className={ `${classes.image}` } />

          <div className={ classes.infoDiv }>
            <h4 className={ classes.name }>{<UserName />}</h4>
            <h6 className={ classes.email }>{<UserEmail />}</h6>
          </div>
        </div>
      </div>

      <div className={ classes.cardSection }>
        <div className={ classes.card }>
          <h5 className={ classes.cardHeading }>
            Total Monthly Cost <span>${curUser!.monthlyCost.total}</span>
          </h5>

          {/* {
            curUser!.monthlyCost.costs.map(
              (cost, index) => (
                <p className={ classes.cardText } key={ index }>
                  { cost.description } <span className={ classes.price }>${ cost.amount }</span>
                </p>
              )
            )
          } */}
        </div>

        <div className={ classes.card }>
          <h5 className={ classes.cardHeading }>Payment History</h5>

          {curUser!.payments.map((payment, index) => (
            <p className={ classes.cardText } key={ index }>
              {payment.description}{' '}
              <span className={ classes.price }>${payment.amount}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
