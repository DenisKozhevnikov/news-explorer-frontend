import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../utils/token";
import AuthPreloader from "../AuthPreloader";

const ProtectedRoute = ({
  setIsLoginPopupOpen,
  component: Component,
  ...props
}) => {
  const token = getToken();

  return (
    <Route>
      {() => {
        if (props.isLoggedIn) {
          return <Component {...props} />;
        }
        if (token) {
          return <AuthPreloader />;
        }
        return (
          <>
            {setIsLoginPopupOpen(true)}
            <Redirect to="/" />
          </>
        );
      }}
    </Route>
  );
};

export default ProtectedRoute;
