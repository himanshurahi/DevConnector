import axios from "axios";
import { showAlert, setloading } from "./alert.action";
import { useHistory } from "react-router-dom";
import setAuthToken from "./setAuthToken";

export const login = (data, ownProps) => {
  return function (dispatch) {
    dispatch(setloading(true));
    console.log("/api/auth");
    axios
      .post("/api/auth", data)
      .then((res) => {
        // dispatch(showAlert({ msg: "Logged In", alertType: "success" }));
        //   props.history.push("/dashboard");
        dispatch(setloading(false));
        dispatch({ type: "LOGIN", payload: res.data.token });
        dispatch(loadUser());
        // ownProps.history.push("/dashboard");
      })
      .catch((error) => {
        dispatch(
          showAlert({
            msg: "Invalid Username Or Password",
            alertType: "danger",
          })
        );
        dispatch(setloading(false));
      });
  };
};

export const SignupUser = (data) => {
  return function (dispatch) {
    axios
      .post("/api/users", data)
      .then((res) => {
        console.log(res);
        dispatch({ type: "SIGNUP_SUCCESS", payload: res.data.token });
        dispatch(showAlert({ msg: "Successfully", alertType: "success" }));
        dispatch(loadUser());
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(
          showAlert({ msg: error.response.data.error, alertType: "danger" })
        );
      });
  };
};

export const loadUser = (data, props) => {
  return function (dispatch) {
    // dispatch({ type: "LOAD_USER_START" });
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }

    axios
      .get("/api/auth")
      .then((res) => {
        console.log(res);
        dispatch({ type: "LOAD_USER", payload: res.data });
        // dispatch({ type: "LOAD_USER_COMPLETE" });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: "LOAD_USER_FAILED" });
      });
  };
};

// export const clearProfile = () => {
//   return function (dispatch) {
//     dispatch({ type: "CLEAR_PROFILE" });
//   };
// };

export const logout = () => {
  return function (dispatch) {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_PROFILE" });
  };
};
