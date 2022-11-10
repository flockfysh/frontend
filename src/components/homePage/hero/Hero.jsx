import Button from "../../UI/button/Button";
import LinkUnderline from "../../UI/link/Link";
import Heading from "../../UI/heading/Heading";
import heroImage from "../../../images/HeroImage.jpg";

import classes from "./Hero.module.css";

export default function Hero() {
   return (
      <section className={ classes.heroSectionDiv }>
         <div className={ classes.contentSection }>
            <Heading
               beforeSpan=""
               span="Automatic "
               afterSpan="dataset generation, minus the hassle."
            />

            <div className={ classes.buttonsHolder }>
               <Button hasArrow={true} text="Start Flockfyshing" link="/signup" />

               <LinkUnderline to="/" text="Read the docs" />
            </div>
         </div>
         
         <img src={ heroImage } alt="Hero" className={ classes.image } />
      </section>
   );
}
