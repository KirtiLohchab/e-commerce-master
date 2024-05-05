import React from "react";
import Home from "./pages/home";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

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
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
