import Hero from '../../components/homePage/hero/hero';
import Features from '../../components/homePage/features/features';
import Reviews from '../../components/homePage/reviews/reviews';
import UserSignup from '../../components/homePage/userSignup/userSignup';
import CoreBelief from '../../components/homePage/coreBelief/coreBelief';

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
