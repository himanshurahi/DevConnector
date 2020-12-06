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
import { Addeducation } from "../../../actions/profile.action";

function AddEducation(props) {
  const [disable, setDisable] = React.useState(false);

  const btnLoading = useSelector((state) => {
    return state.profile.btnLoading;
  });

  const dispatch = useDispatch();

  return (
    <div className="login">
      <Formik
        initialValues={{
          education: "Doctorate/PhD",
          course: "",
          specialization: "",
          university: "",
          passing_year: "",
        }}
        validate={(values) => {
          const errors = {};

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
          dispatch(Addeducation(values, props));

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
            <Form onSubmit={handleSubmit}>
              <h1>
                <b>Add Education</b>
              </h1>
              <Form.Group controlId="education">
                <Form.Label>Education</Form.Label>
                <Form.Control
                  as="select"
                  name="education"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.education}
                >
                  <option value="Doctorate/PhD">Doctorate/PhD</option>
                  <option value="Master/Post-Graduation">
                    Master/Post-Graduation
                  </option>
                  <option value="Graduation/Diploma">Graduation/Diploma</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="course">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  name="course"
                  type="text"
                  placeholder="Course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.course}
                  isInvalid={!!errors.course}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.course}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="specialization">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  name="specialization"
                  type="text"
                  placeholder="Specialization"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.specialization}
                  isInvalid={!!errors.specialization}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.specialization}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="University/Institute">
                <Form.Label>University/Institute</Form.Label>
                <Form.Control
                  name="university"
                  type="text"
                  placeholder="University/Institute"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.university}
                  isInvalid={!!errors.university}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.university}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="passing_year">
                <Form.Label>Passing Year</Form.Label>
                <Form.Control
                  name="passing_year"
                  type="text"
                  placeholder="Passing Year"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passing_year}
                  isInvalid={!!errors.passing_year}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passing_year}
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

export default withRouter(AddEducation);
