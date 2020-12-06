export const showAlert = (data) => {
  return function (dispatch) {
    dispatch({ type: "SHOW_ALERT", payload: data });

    setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
    }, 5000);
  };
};

export const hideAlert = () => {
  return function (dispatch) {
    dispatch({ type: "HIDE_ALERT" });
  };
};

export const setloading = (data) => {
  return function (dispatch) {
    dispatch({ type: "SET_LOADING", payload: data });
  };
};
