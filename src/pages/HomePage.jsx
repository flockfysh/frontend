import { Fragment } from "react";

import Hero from "../components/Sections/hero/hero";
import Features from "../components/Sections/Features/Features.jsx"
import Reviews from "../components/Sections/Reviews/Reviews";
import UserSignup from "../components/Sections/userSignup/UserSignup";

const HomePage = () => {
   return (
      <Fragment>
         <Hero />
         <Features />
         <Reviews />
         <UserSignup />
      </Fragment>
   );
};

export default HomePage;
