import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";
import Layout from "./components/layout/layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Layout>
         <App />
      </Layout>
   </React.StrictMode>
);
