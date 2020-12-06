import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../../actions/profile.action";
import { withRouter } from "react-router";
import Spinner from "react-bootstrap/Spinner";

function Profiles(props) {
  const style = {
    border: "1px solid",
  };
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.profile.loading;
  });

  React.useLayoutEffect(() => {
    dispatch({ type: "CLEAR_PROFILE" });
  }, []);

  React.useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const profiles = useSelector((state) => {
    return state.profile.profiles;
  });

  return (
    <div>
      <Container>
        {/* <h1 className = "text-white">Developers</h1> */}
        {!loading ? (
          profiles.map(
            (
              { bio, status, location, skills, user: { username, _id } },
              index
            ) => {
              return (
                <Row className="mt-5" key={index}>
                  <Col lg={12} sm={12} xs={12}>
                    <Card
                      className="text-center"
                      bg="dark"
                      text="white"
                      style={style}
                    >
                      <Card.Header>{username}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>{" "}
                          {status}
                        </Card.Title>
                        <Card.Text>
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>{" "}
                          {location}
                        </Card.Text>
                        <Button
                          onClick={() => props.history.push("/profile/" + _id)}
                          variant="primary"
                        >
                          View Profile
                        </Button>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        Skills: {skills.reduce((str, el) => str + ", " + el)}
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              );
            }
          )
        ) : (
          <Spinner
            style={{ position: "absolute", top: "50%", left: "50%" }}
            variant="primary"
            animation="grow"
          />
        )}
      </Container>
    </div>
  );
}

export default withRouter(Profiles);
