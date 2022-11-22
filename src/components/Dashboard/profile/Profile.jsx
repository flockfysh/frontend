import Subheading from "../../UI/subHeading/Subheading";
import image from "../../../images/HeroImage.jpg";
import classes from "./Profile.module.css";
const Profile = () => {
   return (
      <div className={classes.containerDiv}>
         <div className={classes.imageSection}>
            <h3 className={classes.heading}>Your Account</h3>
            <div className={classes.nameDiv}>
               <img src={image} alt="HeroImage" className={classes.image} />
               <div className={classes.infoDiv}>
                  <h4 className={classes.name}>Raymond Tian</h4>
                  <h6 className={classes.email}>raymond@testMail.com</h6>
               </div>
            </div>
         </div>
         <div className={classes.cardSection}>
            <div className={classes.card}>
               <h5 className={classes.cardHeading}>Total Monthly Cost : $230</h5>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
            </div>
            <div className={classes.card}>
               <h5 className={classes.cardHeading}>Payment History</h5>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
               <p className={classes.cardText}>
                  Lorem ipum dolor sit amet <span className={classes.price}>$40</span>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Profile;
