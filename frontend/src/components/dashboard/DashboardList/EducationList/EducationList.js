import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteEducation } from "../../../../actions/profile.action";
import Spinner from "react-bootstrap/Spinner";

function EducationList({ educations }) {
  const style = {
    textTransform: "capitalize",
    textAlign: "center",
  };

  const deleteButtons = useSelector((state) => {
    return state.profile.deleteButtons;
  });

  //   console.log(deleteButtons.includes("5fc37ee06e3bc104d39b2e62"))

  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <h4 style={{ marginTop: "20px" }}>
        <b>Education Credentials</b>
      </h4>

      {educations.length != 0 ? (
        <Table striped bordered hover variant="dark" responsive style={style}>
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Title</th>
              <th>University</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {educations.map(({ education, course, university, _id }, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{education}</td>
                  <td>{course}</td>
                  <td>{university}</td>
                  <td>
                    {deleteButtons.includes(_id) ? (
                      <Button variant="danger" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deleteEducation(_id))}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        "There is no Education Credentials"
      )}
    </React.Fragment>
  );
}

export default EducationList;
