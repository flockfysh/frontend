import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
