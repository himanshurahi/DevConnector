import axios from "axios";
import setAuthToken from "./setAuthToken";
import { showAlert } from "./alert.action";
export const getCurrentProfile = () => {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    axios
      .get("/api/profile/me")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "GET_PROFILE", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "GET_PROFILE_FAILED" });
      });
  };
};

export const createProfile = (data, edit, props) => {
  return function (dispatch) {
    dispatch({ type: "START_CREATE_PROFILE" });
    axios
      .post("/api/profile/", data)
      .then((res) => {
        dispatch({ type: "CREATE_PROFILE", payload: res.data });
        dispatch(
          showAlert({
            msg: edit
              ? "Profile Updated Successfully"
              : "Profile Created Successfully",
            alertType: "success",
          })
        );
        props.history.push("/dashboard");
      })
      .catch((error) => {
        dispatch({ type: "CREATE_PROFILE_FAILED" });
        showAlert({ msg: error.response.data.error, alertType: "danger" });
      });
  };
};

export const Addexperience = (data, props) => {
  return function (dispatch) {
    dispatch({ type: "ADD_EXPERIENCE_START" });
    axios
      .patch("/api/profile/experience", data)
      .then((res) => {
        dispatch({ type: "ADD_EXPERIENCE", payload: res.data });
        dispatch(
          showAlert({
            msg: "Experience Added Successfully",
            alertType: "success",
          })
        );
        props.history.push("/dashboard");
      })
      .catch((error) => {
        dispatch({ type: "ADD_EXPERIENCE_FAILED" });
        showAlert({ msg: error.response.data.error, alertType: "danger" });
      });
  };
};

export const Addeducation = (data, props) => {
  return function (dispatch) {
    dispatch({ type: "ADD_EDUCATION_START" });
    axios
      .patch("/api/profile/education", data)
      .then((res) => {
        dispatch({ type: "ADD_EDUCATION", payload: res.data });
        dispatch(
          showAlert({
            msg: "Education Added Successfully",
            alertType: "success",
          })
        );
        props.history.push("/dashboard");
      })
      .catch((error) => {
        dispatch({ type: "ADD_EDUCATION_FAILED" });
        showAlert({ msg: "Something Went Wrong", alertType: "danger" });
      });
  };
};

export const deleteEducation = (edu_id) => {
  return function (dispatch) {
    dispatch({ type: "DELETE_EDUCATION_START", payload: edu_id });
    axios
      .delete("/api/profile/education/" + edu_id)
      .then((res) => {
        dispatch({
          type: "DELETE_EDUCATION",
          payload: { data: res.data, edu_id: edu_id },
        });
        dispatch(
          showAlert({
            msg: "Education Deleted Successfully",
            alertType: "success",
          })
        );
      })
      .catch((error) => {
        dispatch({ type: "DELETE_EDUCATION_FAILED" });
        showAlert({ msg: "Something Went Wrong", alertType: "danger" });
      });
  };
};

export const DeleteExperience = (exp_id) => {
  return function (dispatch) {
    dispatch({ type: "DELETE_EXPERIENCE_START", payload: exp_id });
    axios
      .delete("/api/profile/experience/" + exp_id)
      .then((res) => {
        dispatch({
          type: "DELETE_EXPERIENCE",
          payload: { data: res.data, exp_id: exp_id },
        });
        dispatch(
          showAlert({
            msg: "Experience Deleted Successfully",
            alertType: "success",
          })
        );
      })
      .catch((error) => {
        dispatch({ type: "DELETE_EXPERIENCE_FAILED" });
        showAlert({ msg: "Something Went Wrong", alertType: "danger" });
      });
  };
};

//getProfiles

export const getProfiles = () => {
  return function (dispatch) {
    dispatch({ type: "CLEAR_PROFILE" });
    axios
      .get("/api/profile")
      .then((res) => {
        dispatch({
          type: "GET_PROFILES",
          payload: res.data,
        });
      })
      .catch((res) => {
        dispatch({
          type: "GET_PROFILES_FAILED",
        });
      });
  };
};

export const getProfileById = (id) => {
  return function (dispatch) {
    axios
      .get("/api/profile/user/" + id)
      .then((res) => {
        dispatch(getGithubRepos(res.data.githubusername));
        dispatch({
          type: "GET_PROFILE",
          payload: res.data,
        });
      })
      .catch((res) => {
        dispatch({
          type: "GET_PROFILE_FAILED",
        });
      });
  };
};

export const getGithubRepos = (username) => {
  return function (dispatch) {
    axios
      .get("/api/profile/github/" + username)
      .then((res) => {
        dispatch({
          type: "GET_REPOS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "GET_REPOS_FAILED",
        });
      });
  };
};
//added a
