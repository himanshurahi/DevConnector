import React from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { showAlert, hideAlert } from "../../../actions/alert.action";
import MyAlerts from "../../alert/alert";
import axios from "axios";
import { SignupUser } from "../../../actions/auth.action";
import { Redirect } from "react-router";

function Signup() {
  const [loading, setloading] = React.useState(false);
  const dispatch = useDispatch();

  const showAlert = useSelector((state) => {
    return state.alert.showAlert;
  });
  const isAuth = useSelector((state) => {
    return state.auth.isAuth;
  });
  if (isAuth) {
    return <Redirect to="/dashboard"></Redirect>;
  }
  return (
    <div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = "Required";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length <= 5) {
            errors.password = "Password Length Must be greater then 5";
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
          setloading(true);
          const data = {
            username: values.username,
            email: values.email,
            password: values.password,
          };

          dispatch(SignupUser(data));

          setSubmitting(false);
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
            <Form className="login" onSubmit={handleSubmit}>
              {showAlert && <MyAlerts />}

              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && errors.username}
              </Form.Group>
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
                  type="password"
                  placeholder="Password"
                  name="password"
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
                  Sign up
                </Button>
              )}
            </Form>
            {/* <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}

              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form> */}
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
