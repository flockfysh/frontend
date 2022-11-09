import Hero from "../components/homePage/hero/Hero";
import Features from "../components/homePage/features/Features";
import Reviews from "../components/homePage/reviews/Reviews";
import UserSignup from "../components/homePage/userSignup/UserSignup";
import CoreBelief from "../components/homePage/coreBelief/CoreBelief";

export default function HomePage() {
   return (
      <>
         <Hero />
         <Features />
         <CoreBelief />
         <Reviews />
         <UserSignup />
      </>
   );
};
