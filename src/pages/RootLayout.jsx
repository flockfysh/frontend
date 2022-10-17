import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const RootLayout = () => {
   return (
      <>
         <Navbar />
         <main>
            <Outlet />
         </main>
         <Footer />
      </>
   );
};

export default RootLayout;
