import { Fragment } from "react";

import Hero from "../components/Sections/homePage/hero/Hero";
import Features from "../components/Sections/homePage/features/Features.jsx";
import Reviews from "../components/Sections/homePage/reviews/Reviews";
import UserSignup from "../components/Sections/homePage/userSignup/UserSignup";
import CoreBelief from "../components/Sections/homePage/coreBelief/CoreBelief";

const HomePage = () => {
   return (
      <Fragment>
         <Hero />
         <Features />
         <CoreBelief />
         <Reviews />
         <UserSignup />
      </Fragment>
   );
};

export default HomePage;
