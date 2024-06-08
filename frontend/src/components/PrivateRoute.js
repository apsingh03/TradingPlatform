import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const authReduxisAuthenticated = useSelector(
    (state) => state.auth.loggedData.isUserLogged
  );

  return authReduxisAuthenticated ? element : <Navigate to="/signup" />;
};

export default PrivateRoute;
