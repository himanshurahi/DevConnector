import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.css";
import Spinner from "react-bootstrap/Spinner";
import { Redirect, withRouter } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile.action";
import MyAlerts from "../alert/alert";
import ExperienceList from "./DashboardList/ExperienceList/ExperienceList";
import EducationList from "./DashboardList/EducationList/EducationList";
function Dashboard(props) {
  const AuthData = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();

  const loading = useSelector((state) => {
    return state.profile.profileLoading;
  });

  const username = useSelector((state) => {
    return state.auth.AuthData.username;
  });

  const edit = useSelector((state) => {
    return state.profile.profile;
  });

  const showAlert = useSelector((state) => {
    return state.alert.showAlert;
  });

  const profile = useSelector((state) => {
    return state.profile.profile;
  });

  const isAuth = localStorage.getItem("token");
  React.useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    dispatch({ type: "CLEAR_PROFILE" });
  }, [dispatch]);

  let dataToDisplay = !loading ? (
    <Container className="dashboard">
      {showAlert && <MyAlerts />}
      <h1>
        <i className="fa fa-user" aria-hidden="true"></i> <b>Dashboard</b>
      </h1>

      <h3>Welcome {username} </h3>
      <Row>
        <Col xs={6} lg={2}>
          {!edit ? (
            <Button
              className="MyButton"
              onClick={() => props.history.push("/create-profile")}
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Create Profile
            </Button>
          ) : (
            <Button
              className="MyButton"
              onClick={() => props.history.push("/edit-profile")}
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Edit Profile
            </Button>
          )}
        </Col>
        <Col xs={6} lg={2}>
          <Button
            className="MyButton"
            onClick={() => props.history.push("/add-experience")}
          >
            <i className="fa fa-briefcase" aria-hidden="true"></i> Add
            Experience
          </Button>
        </Col>
        <Col
          xs={6}
          lg={2}
          className="myButton"
          onClick={() => props.history.push("/add-education")}
        >
          <Button className="MyButton">
            <i className="fa fa-book" aria-hidden="true"></i> Add Education
          </Button>
        </Col>
      </Row>

      <ExperienceList experiences={edit ? profile.experience : []} />
      <EducationList educations={edit ? profile.education : []} />
    </Container>
  ) : (
    <div className="mySpinner">
      <Spinner variant="primary" animation="grow" />
    </div>
  );
  return dataToDisplay;
}

export default withRouter(Dashboard);
