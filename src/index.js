import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
