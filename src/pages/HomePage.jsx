import { Fragment } from "react";

import Hero from "../components/sections/homePage/hero/Hero";
import Features from "../components/sections/homePage/features/Features.jsx";
import Reviews from "../components/sections/homePage/reviews/Reviews";
import UserSignup from "../components/sections/homePage/userSignup/UserSignup";
import CoreBelief from "../components/sections/homePage/coreBelief/CoreBelief";

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
