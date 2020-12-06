import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import MyAlerts from "../../alert/alert";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { showAlert, hideAlert } from "../../../actions/alert.action";
import { addPost } from "../../../actions/post.action";

function AddPost(props) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.post.btnLoading;
  });
  return (
    <div className="login">
      <Formik
        initialValues={{ title: "", body: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.body) {
            errors.body = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          dispatch(addPost(values, props));
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
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Post Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />

                {errors.title && touched.title && errors.title}
              </Form.Group>
              <Form.Group controlId="bio">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  name="body"
                  as="textarea"
                  rows={3}
                  placeholder="Post Body"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.body}
                  isInvalid={!!errors.body}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.body && touched.body && errors.body}
                </Form.Control.Feedback>
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
                  Add Post
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

export default withRouter(AddPost);
