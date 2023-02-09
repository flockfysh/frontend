import { useEffect, useState } from 'react';

import Loading from '../../components/loading/loading';

import classes from './profile.module.css';
import UserPicture from '../../components/UI/currentUser/userPicture';
import UserName from '../../components/UI/currentUser/userName';
import UserEmail from '../../components/UI/currentUser/userEmail';

export default function Profile() {
  const [user, updateUser] = useState({} as User);
  const [loading, updateLoading] = useState(true);

  useEffect(() => {
    updateLoading(true);

    (async function fetchUser() {

      const testUser: User = {
        name: 'Raymond Tian',
        email: 'raymond@gmail.com',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2ueFQbN4a-eE_Gv-L4zOnsJBfsJZqiUek_ZiQvJ1gQ&s',
        monthlyCost: {
          storage: 100,
          creation: 100,
          total: 230,
          costs: [
            {
              description: 'Dataset creation',
              amount: 40,
              paid: false,
              timestamp: new Date()
            }
          ]
        },
        payments: [
          {
            description: 'Dataset payment',
            amount: 40,
            paid: true,
            timestamp: new Date()
          }
        ]
      };

      updateUser(testUser);

      updateLoading(false);
    })();
  }, []);

  if(loading) return <Loading />;

  return (
    <div className={ classes.containerDiv }>
      <div className={ classes.imageSection }>
        <h3 className={ classes.heading }>Your Account</h3>

        <div className={ classes.nameDiv }>
          <UserPicture className={`${classes.image}`}/>

          <div className={ classes.infoDiv }>
            <h4 className={ classes.name }>{ <UserName/> }</h4>
            <h6 className={ classes.email }>{<UserEmail/>}</h6>
          </div>
        </div>
      </div>

      <div className={ classes.cardSection }>
        <div className={ classes.card }>
          <h5 className={ classes.cardHeading} >
            Total Monthly Cost <span>${ user.monthlyCost.total }</span>
          </h5>

          {
            user.monthlyCost.costs!.map(
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
            user.payments.map(
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
