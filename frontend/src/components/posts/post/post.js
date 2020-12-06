import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { getSinglePost } from "../../../actions/post.action";
import "./post.css";
import Comments from "./comments/comments";
function Post(props) {
  const dispatch = useDispatch();

  const post = useSelector((data) => {
    return data.post.post;
  });

  const loading = useSelector((state) => {
    return state.post.loading;
  });

  React.useLayoutEffect(() => {
    dispatch({ type: "CLEAR_POST" });
  }, []);

  React.useEffect(() => {
    dispatch(getSinglePost(props.match.params.id, props));
  }, []);

  return (
    <React.Fragment>
      {!loading ? (
        <div className="container">
          <Row className="mb-5 mt-5">
            <Col>
              <Card bg={"dark"} text={"white"} className="mb-2">
                <Card.Body>
                  <Card.Title style={{ textTransform: "capitalize" }}>
                    {post.title}{" "}
                  </Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Posted By :{" "}
                    {post.user == null ? (
                      <span style={{ color: "grey" }}>User Deleted</span>
                    ) : (
                      post.user.username
                    )}{" "}
                    On {new Date(post.date).toLocaleDateString()}
                  </small>

                  <small className="text-muted mx-4">
                    Total Likes: {post.like && post.like.length}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Comments post_id={props.match.params.id} comments={post.comments} />
        </div>
      ) : (
        <Spinner
          style={{ position: "absolute", top: "50%", left: "50%" }}
          animation="grow"
          variant="primary"
        />
      )}
    </React.Fragment>
  );
}

export default withRouter(Post);
