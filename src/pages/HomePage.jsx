import { Fragment } from "react";

import Hero from "../components/Sections/hero/hero";
import UserSignup from "../components/Sections/userSignup/UserSignup";

const HomePage = () => {
   return (
      <Fragment>
         <Hero />
         <UserSignup />
      </Fragment>
   );
};

export default HomePage;
