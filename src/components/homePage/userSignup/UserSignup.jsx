import Button from '../../UI/button/button';

import classes from './userSignup.module.css';

export default function UserSignup() {
   return (
      <section className={ classes.holder }>
         <h3 className={ classes.heading }>Ready? Set? Create!</h3>

         <p className={ classes.text }>
            What are you waiting for? Show our data-driven world who's king, maybe with a couple of
            stats ;&#41;
         </p>
         
         <Button hasArrow={ true } text="Commence FlockFyshing!" link="/signup" />
      </section>
   );
};
