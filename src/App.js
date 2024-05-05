import React from "react";

import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Checkout } from "./pages/Checkout";
import { ProductDetails } from "./features/product-List/components/ProductDetails";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signIn",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/productDetails",
    element: <ProductDetails />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
