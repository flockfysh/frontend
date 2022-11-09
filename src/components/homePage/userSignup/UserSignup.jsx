import Button from "../../UI/button/Button";

import classes from "./UserSignup.module.css";

export default function UserSignup() {
   return (
      <section className={ classes.holder }>
         <h3 className={ classes.heading }>Ready? Set? Create!</h3>

         <p className={ classes.text }>
            What are you waiting for? Show our data-driven world who's king, maybe with a couple of
            stats ;&#41;
         </p>
         
         <Button text="Commence FlockFyshing!" link="/signup" />
      </section>
   );
};
