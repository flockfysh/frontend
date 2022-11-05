import "./styles/index.css";
import {
   createBrowserRouter,
   RouterProvider,
   createRoutesFromElements,
   Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout.jsx";
import LoginPage from "./pages/LoginPage";

function App() {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/docs" element={<h1>docs</h1>} />
            <Route path="/blog" element={<h1>blog</h1>} />
            <Route path="/about" element={<h1>about</h1>} />
            <Route path="/login" element={<LoginPage type="Login" />} />
            <Route path="/signup" element={<LoginPage type="Signup" />} />
         </Route>
      )
   );
   return <RouterProvider router={router} />;
}

export default App;
