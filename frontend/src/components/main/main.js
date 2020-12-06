import React from "react";
import "./main.css";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

function Main() {
  return (
    <div className="main">
      <h1>
        <b>Dev Connector</b>
      </h1>
      <h3>A Place Where you met developers</h3>
      <Button href="/profiles" variant="primary">
        Browse
      </Button>{" "}
      <Button
        href="https://github.com/himanshurahi/DevConnector"
        variant="info"
      >
        Github
      </Button>
    </div>
  );
}

export default Main;
