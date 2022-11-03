import Button from "../../../ui/linksAndButtons/Button";
import LinkUnderline from "../../../ui/linksAndButtons/Link";
import classes from "./Hero.module.css";
import heroImage from "../../../../images/heroImage.jpg";
import Heading from "../../../ui/headings/Heading";

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
