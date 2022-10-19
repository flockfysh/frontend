import { Fragment } from "react";

import Hero from "../components/Sections/hero/hero";
import Reviews from "../components/Sections/Reviews/Reviews";
import UserSignup from "../components/Sections/userSignup/UserSignup";

const HomePage = () => {
   return (
      <Fragment>
         <Hero />
         <Reviews />
         <UserSignup />
      </Fragment>
   );
};

export default HomePage;
