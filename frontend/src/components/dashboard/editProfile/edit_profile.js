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
import {
  createProfile,
  getCurrentProfile,
} from "../../../actions/profile.action";

function EditProfile(props) {
  const dispatch = useDispatch();

  const btnLoading = useSelector((state) => {
    return state.profile.btnLoading;
  });

  const profile = useSelector((state) => {
    return state.profile.profile;
  });

  const loading = useSelector((state) => {
    return state.profile.profileLoading;
  });
  console.log(profile);
  React.useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  let dataToDisplay = !loading ? (
    <div className="login">
      <Formik
        initialValues={{
          status: "developer",
          company: profile.company,
          website: profile.website,
          location: profile.location,
          skills: profile.skills.join(","),
          bio: profile.bio,
          githubusername: profile.githubusername,

          facebook: profile.social.facebook,
          twitter: profile.social.twitter,
          instagram: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.status) {
            errors.status = "Required";
          }

          if (!values.company) {
            errors.company = "Required";
          }
          if (!values.website) {
            errors.website = "Required";
          }
          if (!values.location) {
            errors.location = "Required";
          }
          if (!values.skills) {
            errors.skills = "Required";
          }
          if (!values.bio) {
            errors.bio = "Required";
          }
          if (!values.bio) {
            errors.githubusername = "Required";
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
        onSubmit={(values, { setSubmitting }) => {
          dispatch(createProfile(values, true, props));
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
              <h1><i className="fa fa-pencil" aria-hidden="true"></i> <b>Edit Profile</b></h1>
              <Form.Group controlId="exampleForm.ControlSelect1">
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

              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  name="website"
                  type="text"
                  placeholder="Website"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.website}
                  isInvalid={!!errors.website}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.website}
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

              <Form.Group controlId="skills">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  name="skills"
                  type="text"
                  placeholder="Skills"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.skills}
                  isInvalid={!!errors.skills}
                />
                <Form.Text className="text-muted">
                  Please use comma seprated values (eg, HTML,CSS,PHP).
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.skills}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="githubusername">
                <Form.Label>Github username</Form.Label>
                <Form.Control
                  name="githubusername"
                  type="text"
                  placeholder="Github username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.githubusername}
                  isInvalid={!!errors.githubusername}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.githubusername}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  name="bio"
                  as="textarea"
                  rows={3}
                  placeholder="A Short Bio of yourself"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bio}
                  isInvalid={!!errors.bio}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bio}
                </Form.Control.Feedback>
              </Form.Group>

              <Accordion defaultActiveKey="0" style={{ marginBottom: "20px" }}>
                <Accordion.Toggle as={Button} variant="info" eventKey="1">
                  <i className="fa fa-share-square" aria-hidden="true"></i> Add
                  Social Network Link
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="1" style={{ marginTop: "20px" }}>
                  <React.Fragment>
                    <Form.Group controlId="twitter">
                      <Form.Control
                        name="twitter"
                        type="text"
                        placeholder="Twitter"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.twitter}
                      />
                    </Form.Group>
                    <Form.Group controlId="facebook">
                      <Form.Control
                        name="facebook"
                        type="text"
                        placeholder="Facebook"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.facebook}
                      />
                    </Form.Group>
                    <Form.Group controlId="instagram">
                      <Form.Control
                        name="instagram"
                        type="text"
                        placeholder="Instagram"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.instagram}
                      />
                    </Form.Group>
                  </React.Fragment>
                </Accordion.Collapse>
              </Accordion>

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
                  Update
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
  ) : (
    "Loading..."
  );

  return dataToDisplay;
}

export default withRouter(EditProfile);
