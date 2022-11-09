import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage";
import Docs from "./pages/Docs";
import Blog from "./pages/Blog";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={ <RootLayout /> }>
               <Route index element={ <HomePage /> } />

               <Route path="/docs" element={ <Docs /> } />
               <Route path="/blog" element={ <Blog /> } />
               <Route path="/about" element={ <About /> } />
               <Route path="/login" element={ <LoginPage type="Login" /> } />
               <Route path="/signup" element={ <LoginPage type="Signup" /> } />

               <Route path="*" element={ <PageNotFound /> }></Route>
            </Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>
);
