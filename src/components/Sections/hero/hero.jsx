import Button from "../../UI/Links_and_Buttons/Button";
import LinkUnderline from "../../UI/Links_and_Buttons/Link";
import classes from "./hero.module.css";
import heroImage from "../../../images/HeroImage.jpg";
import Heading from "../../UI/Headings/Heading";

export default function hero() {
   return (
      <section className={classes.heroSectionDiv}>
         <div className={classes.contentSection}>
            <Heading
               beforeSpan=""
               span="Automatic "
               afterSpan="dataset generation, minus the hassle."
            />
            <div className={classes.buttonsHolder}>
               <Button text="Start Flockfyshing" to="/" />
               <LinkUnderline to="/" text="Read the docs" />
            </div>
         </div>
         <img src={heroImage} alt="HeroImage" className={classes.image} />
      </section>
   );
}
