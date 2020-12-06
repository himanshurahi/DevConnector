const intialState = {
  msg: "",
  showAlert: false,
  alertType: "",
  loading: false,
};

const AlertReducer = (state = intialState, action) => {
  if (action.type == "SHOW_ALERT") {
    return {
      msg: action.payload.msg,
      showAlert: true,
      alertType: action.payload.alertType,
    };
  }
  if (action.type == "HIDE_ALERT") {
    return {
      msg: "",
      showAlert: false,
      alertType: "",
    };
  }
  if (action.type == "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  return state;
};

export default AlertReducer;
