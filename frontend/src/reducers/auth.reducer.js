const intialState = { isAuth: false, AuthData: {} };

const Auth = (state = intialState, action) => {
  if (action.type == "LOGIN") {
    localStorage.setItem("token", action.payload);
    return {
      ...state,
      isAuth: true,
      AuthData: action.payload,
      loading: false,
    };
  }

  //   if (action.type == "LOAD_USER_START") {
  //     return {
  //       ...state,
  //       loading: true,
  //     };
  //   }

  if (action.type == "LOAD_USER") {
    return {
      ...state,
      isAuth: true,
      AuthData: action.payload,
    };
  }

  //   if (action.type == "LOAD_USER_COMPLETE") {
  //     return {
  //       ...state,
  //       loading: false,
  //     };
  //   }

  if (action.type == "LOAD_USER_FAILED") {
    localStorage.removeItem("token");
    return {
      ...state,
      isAuth: false,
      AuthData: "",
    };
  }

  if (action.type == "SIGNUP_SUCCESS") {
    localStorage.setItem("token", action.payload);
    return {
      ...state,
      isAuth: true,
      AuthData: action.payload,
      loading: false,
    };
  }

  if (action.type == "LOGOUT") {
    localStorage.removeItem("token");
    return {
      ...state,
      isAuth: false,
      AuthData: "",
    };
  }
  return state;
};

export default Auth;
