import Button from "../../UI/Links_and_Buttons/Button";
import classes from "./UserSignup.module.css";

const userSignup = () => {
   return (
      <div className={classes.holder}>
         <h3 className={classes.heading}>Ready? Set? Create!</h3>
         <p className={classes.text}>
            What are you waiting for? Show our data-driven world who's king, maybe with a couple of
            stats ;&#41;
         </p>
         <Button text="Commence Flockfyshing!" link="/" />
      </div>
   );
};

export default userSignup;
