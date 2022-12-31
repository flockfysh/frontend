import { useEffect, useState } from 'react';

import Loading from '../../components/loading/loading';

import classes from './profile.module.css';

export default function Profile() {
  const [user, updateUser] = useState({} as User);
  const [accounting, updateAccounts] = useState({} as Account);
  const [loading, updateLoading] = useState(true);

  useEffect(() => {
    updateLoading(true);

    (async function () {
      // fetch user

      const testUser = {
        name: 'Raymond Tian',
        email: 'raymond@gmail.com',
        profileImage:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2ueFQbN4a-eE_Gv-L4zOnsJBfsJZqiUek_ZiQvJ1gQ&s'
      };

      const accounting = {
        monthlyCosts: {
          storage: 100,
          creation: 100,
          total: 230,
          costs: [
            {
              name: 'Dataset creation',
              amount: 40
            }
          ]
        },
        payments: [
          {
            name: 'Dataset payment',
            amount: 40
          }
        ]
      };

      updateUser(testUser);
      updateAccounts(accounting);

      updateLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className={ classes.containerDiv }>
      <div className={ classes.imageSection }>
        <h3 className={ classes.heading }>Your Account</h3>

        <div className={ classes.nameDiv }>
          <img
            src={ user.profileImage }
            alt="user profile"
            className={ classes.image }
          />

          <div className={ classes.infoDiv }>
            <h4 className={ classes.name }>Hello, { user.name }</h4>
            <h6 className={ classes.email }>{ user.email }</h6>
          </div>
        </div>
      </div>

      <div className={ classes.cardSection }>
        <div className={ classes.card }>
          <h5 className={ classes.cardHeading} >
            Total Monthly Cost: ${ accounting.monthlyCosts.total }
          </h5>

          {
            accounting.monthlyCosts.costs!.map(
              (cost, index) => (
                <p className={ classes.cardText } key={ index }>
                  { cost.name } <span className={ classes.price }>${ cost.amount }</span>
                </p>
              )
            )
          }
        </div>

        <div className={ classes.card }>
          <h5 className={ classes.cardHeading }>Payment History</h5>

          {
            accounting.payments.map(
              (payment, index) => (
                <p className={ classes.cardText } key={ index }>
                  { payment.name } {' '}
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
