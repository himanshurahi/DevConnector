import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth.action";

function MyNavbar() {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();

  const Auth = useSelector((state) => {
    return state.auth;
  });

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Dev Connector</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link eventKey="1" as={Link} to="/profiles">
              Developers
            </Nav.Link>
          </Nav.Item>

          {!Auth.isAuth ? (
            <React.Fragment>
              <Nav.Item>
                <Nav.Link eventKey="2" as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="3" as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Nav.Item>
                <Nav.Link eventKey="4" as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="5" as={Link} to="/posts">
                  Post
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="6" onClick={onLogout} as={Link} to="/login">
                  Logout
                </Nav.Link>
              </Nav.Item>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
    //   <Navbar.Brand href="#home">Dev Connector</Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="ml-auto">
    //       <Nav.Link as={Link} to="/profiles">
    //         Developers
    //       </Nav.Link>
    //       {!Auth.isAuth ? (
    //         <React.Fragment>
    //           <Nav.Link as={Link} to="/login">
    //             Login
    //           </Nav.Link>
    //           <Nav.Link as={Link} to="/signup">
    //             Signup
    //           </Nav.Link>
    //         </React.Fragment>
    //       ) : (
    //         <React.Fragment>
    //           <Nav.Link as={Link} to="/dashboard">
    //             Home
    //           </Nav.Link>
    //           <Nav.Link as={Link} to="/posts">
    //             Posts
    //           </Nav.Link>
    //           <Nav.Link as={Link} onClick={onLogout} to="/login">
    //             Logout
    //           </Nav.Link>
    //         </React.Fragment>
    //       )}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
}
export default MyNavbar;
