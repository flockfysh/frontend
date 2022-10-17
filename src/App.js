import "./styles/index.css";
import {
   createBrowserRouter,
   RouterProvider,
   createRoutesFromElements,
   Route,
} from "react-router-dom";
import Hero from "./components/hero/hero";
import RootLayout from "./pages/RootLayout.jsx";

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<RootLayout />}>
            <Route index element={<Hero />} />
            <Route path="/docs" element={<h1>docs</h1>} />
            <Route path="/blog" element={<h1>blog</h1>} />
            <Route path="/about" element={<h1>about</h1>} />
            <Route path="/login" element={<h1>login</h1>} />
         </Route>
      )
   );
   return <RouterProvider router={router} />;
}

export default App;
