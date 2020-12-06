import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ component: Component, ...rest }) => {
  //   let isAuth = useSelector((state) => {
  //     return state.auth.isAuth;
  //   });

  let isAuth = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? (
          <Redirect to="/login"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default PrivateRouter;
