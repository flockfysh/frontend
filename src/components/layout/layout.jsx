import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import classes from "./layout.module.css";

export default function layout({ children }) {
   return (
      <>
         <Navbar />
         {children}
         {/* <Footer /> */}
      </>
   );
}
