import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import {
  getProfileById,
  getGithubRepos,
} from "../../../actions/profile.action";
import Spinner from "react-bootstrap/Spinner";

function Profile(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => {
    return state.profile.profile;
  });

  const repos = useSelector((state) => {
    return state.profile.repos;
  });

  const authData = useSelector((state) => {
    return state.auth.AuthData;
  });

  const loading = useSelector((state) => {
    return state.profile.profileLoading;
  });
  const style = {
    border: "1px solid",
  };

  React.useEffect(() => {
    // console.log(props.match.params);
    dispatch(getProfileById(props.match.params.id));
  }, []);

  return (
    <div>
      <Container>
        {!loading ? (
          <React.Fragment>
            <Row className="mt-5">
              <Col lg={12} sm={12} xs={12}>
                <Card
                  className="text-center"
                  bg="dark"
                  text="white"
                  style={style}
                >
                  <Card.Img
                    variant="top"
                    src={`https://avatars.dicebear.com/api/male/${profile.user.username}.svg`}
                    style={{ width: "20%" }}
                    className="mx-auto mt-2"
                  />
                  <Card.Body>
                    <Card.Title>{profile.user.username}</Card.Title>
                    <Card.Text>{profile.status}</Card.Text>
                    <Card.Text>
                      <i className="fa fa-map" aria-hidden="true"></i>{" "}
                      {profile.location}
                    </Card.Text>
                    <div>
                      <Button
                        variant="primary"
                        onClick={() => window.open("https://google.com")}
                      >
                        {" "}
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Button>{" "}
                      <Button variant="info">
                        {" "}
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </Button>{" "}
                      <Button
                        variant="secondary"
                        onClick={() =>
                          window.open(
                            `https://github.com/${profile.githubusername}`
                          )
                        }
                      >
                        {" "}
                        <i className="fa fa-github" aria-hidden="true"></i>
                      </Button>{" "}
                      {profile.user._id == authData._id && (
                        <Button
                          onClick={() => props.history.push("/edit-profile")}
                          variant="primary"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col lg={12} sm={12} xs={12}>
                <Card
                  className="text-center"
                  bg="dark"
                  text="white"
                  style={style}
                >
                  <Card.Body>
                    <Card.Title>{profile.user.username} Bio</Card.Title>
                    <Card.Text>{profile.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col lg={12} sm={12} xs={12}>
                <Card
                  className="text-center"
                  bg="dark"
                  text="white"
                  style={style}
                >
                  <Card.Body>
                    <Card.Title>Skill Set</Card.Title>
                    <Card.Text>
                      {profile.skills.map((el, index) => {
                        return (
                          <span key={index}>
                            &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-check" aria-hidden="true"></i>
                            &nbsp;
                            {el}
                          </span>
                        );
                      })}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col lg={6} sm={12} xs={12}>
                <Card
                  className="text-center"
                  bg="dark"
                  text="white"
                  style={style}
                >
                  <Card.Body>
                    <Card.Title>Experience</Card.Title>
                    <Card.Text>
                      {profile.experience.length == 0
                        ? "No Experience"
                        : profile.experience.map((el, index) => {
                            return (
                              <React.Fragment key={index}>
                                <b> {el.company}</b>
                                <br></br>
                                {new Date(el.from).toLocaleDateString() +
                                  " - " +
                                  (el.to
                                    ? new Date(el.to).toLocaleDateString()
                                    : "Now")}
                                <br></br>
                                <b>Position: </b>
                                {el.title}
                                <br></br>
                                <br></br>
                              </React.Fragment>
                            );
                          })}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} sm={12} xs={12}>
                <Card
                  className="text-center"
                  bg="dark"
                  text="white"
                  style={style}
                >
                  <Card.Body>
                    <Card.Title>Education</Card.Title>
                    <Card.Text>
                      {profile.education.length == 0
                        ? " No Education"
                        : profile.education.map((el, index) => {
                            return (
                              <React.Fragment key={index}>
                                {el.education}
                                <br></br>
                                <b>Degree: </b>
                                {el.course}
                                <br></br>
                                <b>Field of Study: </b>
                                {el.specialization}
                                <br></br>
                                <b>University/Institute: </b>
                                {el.university}
                                <br></br>
                                <b>Passing Year: </b>
                                {el.passing_year}
                                <br></br>
                                <br></br>
                              </React.Fragment>
                            );
                          })}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {profile.githubusername && (
              <Row className="mt-5 mb-5">
                <Col lg={12} sm={12} xs={12}>
                  <Card
                    className="text-center"
                    bg="dark"
                    text="white"
                    style={style}
                  >
                    <Card.Body>
                      <Card.Title>Github Repos</Card.Title>
                      <Card.Text>
                        {repos.map((el, index) => {
                          return (
                            <span key={index}>
                              &nbsp;&nbsp;&nbsp;
                              <i className="fa fa-check" aria-hidden="true"></i>
                              &nbsp;
                              {el.name}
                            </span>
                          );
                        })}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </React.Fragment>
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

export default withRouter(Profile);
