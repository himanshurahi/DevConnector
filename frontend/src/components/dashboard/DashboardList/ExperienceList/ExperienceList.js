import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { DeleteExperience } from "../../../../actions/profile.action";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

function ExperienceList({ experiences }) {
  const style = {
    textTransform: "capitalize",
    textAlign: "center",
  };

  const dispatch = useDispatch();

  const deleteButtons = useSelector((state) => {
    return state.profile.deleteButtons;
  });

  return (
    <React.Fragment>
      <h4 style={{ marginTop: "20px" }}>
        <b>Experience Credentials</b>
      </h4>

      {experiences.length != 0 ? (
        <Table striped bordered hover variant="dark" responsive style={style}>
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map(
              ({ company, title, current, from, to, _id }, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{company}</td>
                    <td>{title}</td>
                    <td>
                      {new Date(from).toLocaleDateString() +
                        " - " +
                        (current ? "Now" : new Date(to).toLocaleDateString())}
                    </td>
                    <td>
                      {deleteButtons.includes(_id) ? (
                        <Button variant="danger" disabled>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => dispatch(DeleteExperience(_id))}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      ) : (
        "There is no Experience Credentials"
      )}
    </React.Fragment>
  );
}

export default ExperienceList;
