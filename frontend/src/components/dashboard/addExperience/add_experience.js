import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Formik, Field } from "formik";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import MyAlerts from "../../alert/alert";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { showAlert, hideAlert } from "../../../actions/alert.action";
import { login } from "../../../actions/auth.action";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { Addexperience } from "../../../actions/profile.action";

function AddExperience(props) {
  const [disable, setDisable] = React.useState(false);

  const btnLoading = useSelector((state) => {
    return state.profile.btnLoading;
  });

  const dispatch = useDispatch();

  return (
    <div className="login">
      <Formik
        initialValues={{
          title: "",
          company: "",
          location: "",
          from: "",
          to: "",
          current: "no",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.company) {
            errors.company = "Required";
          }
          if (!values.title) {
            errors.title = "Required";
          }

          if (!values.location) {
            errors.location = "Required";
          }
          if (!values.from) {
            errors.from = "Required";
          }

          if (!values.to && !disable) {
            errors.to = "Required";
          }

          if (values.current) {
            if (values.current == "yes") {
              setDisable(true);
            } else {
              setDisable(false);
            }
          }

          //   if (!values.password) {
          //     errors.password = "Required";
          //   }

          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          dispatch(Addexperience(values, props));
        //   resetForm();
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
              <h1><b><i className="fa fa-briefcase" aria-hidden="true"></i> Add Experience</b></h1>
            <Form onSubmit={handleSubmit}>
            
              {/* <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                >
                  <option value="developer">Developer</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </Form.Control>
              </Form.Group> */}

              <Form.Group controlId="website">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  name="company"
                  type="text"
                  placeholder="Company Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                  isInvalid={!!errors.company}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.company}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  type="text"
                  placeholder="Location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  isInvalid={!!errors.location}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.location}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="from">
                <Form.Label>From</Form.Label>
                <Form.Control
                  name="from"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.from}
                  isInvalid={!!errors.from}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.from}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Current</Form.Label>
                <Form.Control
                  as="select"
                  name="current"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.current}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="to">
                <Form.Label>To</Form.Label>
                <Form.Control
                  name="to"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.to}
                  isInvalid={!!errors.to}
                  disabled={disable}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.to}
                </Form.Control.Feedback>
              </Form.Group>

              {btnLoading ? (
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
                  Save
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

export default withRouter(AddExperience);
