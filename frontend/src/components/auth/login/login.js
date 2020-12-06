import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Formik } from "formik";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import MyAlerts from "../../alert/alert";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { showAlert, hideAlert } from "../../../actions/alert.action";
import { login } from "../../../actions/auth.action";

function Login(props) {
  const loading = useSelector((state) => {
    return state.alert.loading;
  });

  const showAlert = useSelector((state) => {
    return state.alert.showAlert;
  });

  //   const isAuth = localStorage.getItem("token");
  const isAuth = useSelector((state) => {
    return state.auth.isAuth;
  });
  const dispatch = useDispatch();

  if (isAuth) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div className="login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = "Required";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values, props));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div>
            {showAlert && <MyAlerts />}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                {errors.email && touched.email && errors.email}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </Form.Group>
              {loading ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  Login
                </Button>
              )}
            </Form>
          </div>

          //  <form onSubmit={handleSubmit}>
          //    <input
          //      type="email"
          //      name="email"
          //      onChange={handleChange}
          //      onBlur={handleBlur}
          //      value={values.email}
          //    />
          //    {errors.email && touched.email && errors.email}
          //    <input
          //      type="password"
          //      name="password"
          //      onChange={handleChange}
          //      onBlur={handleBlur}
          //      value={values.password}
          //    />
          //    {errors.password && touched.password && errors.password}
          //    <button type="submit" disabled={isSubmitting}>
          //      Submit
          //    </button>
          //  </form>
        )}
      </Formik>
    </div>
  );
}

export default withRouter(Login);
