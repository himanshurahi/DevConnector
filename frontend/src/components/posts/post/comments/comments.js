import Button from "react-bootstrap/Button";
import React from "react";
import { Formik } from "formik";
import "./comments.css";
import { addComment, deleteComment } from "../../../../actions/post.action";
import { useDispatch, useSelector } from "react-redux";

function Comments(props) {
  const dispatch = useDispatch();
  console.log(props);
  const userid = useSelector((state) => {
    return state.auth.AuthData._id;
  });

  return (
    <div>
      <Formik
        initialValues={{ comment: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.comment) {
            errors.comment = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(addComment(props.post_id, { body: values.comment }));
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
          <div className="row">
            <div className="col-12 comment-main rounded">
              <ul className="p-0">
                {props.comments &&
                  props.comments.map((comment, index) => {
                    return (
                      <li key={index}>
                        <div className="row comment-box p-1 pt-3 pr-4">
                          <div className="col-lg-2 col-3 user-img text-center">
                            <img
                              src={`https://avatars.dicebear.com/api/male/${comment.user.username}.svg`}
                              className="main-cmt-img"
                            />
                          </div>
                          <div className="col-lg-10 col-9 user-comment bg-light rounded pb-1">
                            <div className="row">
                              <div className="col-lg-8 col-6 border-bottom pr-0">
                                <p className="w-100 p-2 m-0">
                                  {!comment.body
                                    ? "Invalid Comment"
                                    : comment.body}
                                </p>
                              </div>
                              <div className="col-lg-4 col-6 border-bottom">
                                <p className="w-100 p-2 m-0">
                                  <span className="float-right">
                                    <i
                                      className="fa fa-clock-o mr-1"
                                      aria-hidden="true"
                                    />
                                    {new Date(
                                      comment.date
                                    ).toLocaleDateString()}
                                  </span>

                                  {comment.user._id == userid && (
                                    <span
                                      onClick={() =>
                                        dispatch(
                                          deleteComment(props.post_id, {
                                            comment_id: comment._id,
                                          })
                                        )
                                      }
                                      className="float-right mr-4"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Delete
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}

                <hr />
                <div className="row">
                  <form
                    onSubmit={handleSubmit}
                    style={{ width: "100%", color: "white" }}
                  >
                    <div className="col-lg-12 col-12">
                      <input
                        name="comment"
                        type="text"
                        className="form-control"
                        placeholder="Write Comments ..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                      />
                      {errors.comment && touched.comment && errors.comment}
                    </div>
                    <div className="col-lg-12 col-12 mt-4">
                      <Button type="submit">Add Comment</Button>
                    </div>
                    {/* <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button> */}
                  </form>
                </div>
              </ul>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Comments;
