import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  addLike,
  removeLike,
  deletePost,
} from "../../actions/post.action";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

function Posts(props) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    return state.post.posts;
  });

  const loading = useSelector((state) => {
    return state.post.loading;
  });

  const userid = useSelector((state) => {
    return state.auth.AuthData._id;
  });

  const isLiked = (arr) => {
    return (
      arr.filter((el) => {
        return el.user == userid;
      }).length > 0
    );
  };

  React.useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Container>
      {!loading && (
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => props.history.push("/add-post")}
        >
          Add New
        </Button>
      )}
      {!loading ? (
        posts.map((post, index) => {
          return (
            <Row key={index}>
              <Col>
                <Card bg="dark" text={"white"} className="mb-2 mt-4">
                  <Card.Body>
                    <Card.Title>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "white",
                          textTransform: "capitalize",
                        }}
                        to={"post/" + post._id}
                      >
                        {post.title}{" "}
                      </Link>
                    </Card.Title>
                    <Card.Text>
                     {post.body.substring(0,200)+"..."}
                    </Card.Text>
                    {/* {isLiked(post.like)} */}
                    {!isLiked(post.like) ? (
                      <Button
                        onClick={() => {
                          dispatch(addLike(post._id));
                        }}
                        variant="primary"
                      >
                        Like&nbsp;
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          dispatch(removeLike(post._id));
                        }}
                        variant="primary"
                      >
                        Unlike&nbsp;
                      </Button>
                    )}
                    <Button
                      variant="info"
                      className="mx-2"
                      onClick={() => props.history.push("/post/" + post._id)}
                    >
                      Discussion
                    </Button>
                    {post.user && post.user._id == userid && (
                      <Button
                        onClick={() => dispatch(deletePost(post._id))}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    )}
                    <footer className="blockquote-footer mt-3">
                      <cite title="Source Title">
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to="/"
                        >
                          {!post.user ? "Invalid User" : post.user.username}
                        </Link>
                      </cite>
                    </footer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })
      ) : (
        <Spinner
          style={{ position: "absolute", top: "50%", left: "50%" }}
          animation="grow"
          variant="primary"
        />
      )}
    </Container>
  );
}

export default withRouter(Posts);
