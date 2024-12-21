import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LogIn from "./component/LogIn";
import Layout from "./Layout";
import UserManagment from "./component/UserManagment";
import PasswordReset from "./component/ForgotRestPassword";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LogIn />} />
        <Route path="/resetPassword"  element={<PasswordReset />} />

        <Route path="/" element={<Layout />} >
          <Route path="/UserManagment" element={<UserManagment />} />
        </Route>
      </Route>

    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
