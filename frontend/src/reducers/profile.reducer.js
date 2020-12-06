const intialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true,
  btnLoading: false,
  deleteButtons: [],
  profileLoading: true,
};

const ProfileReducer = (state = intialState, action) => {
  if (action.type == "GET_PROFILES") {
    return {
      ...state,
      profiles: action.payload,
      loading: false,
    };
  }

  if (action.type == "GET_PROFILE_START") {
    return {
      ...state,
      profileLoading: true,
    };
  }
  if (action.type == "GET_PROFILE") {
    return {
      ...state,
      profile: action.payload,
      loading: false,
      profileLoading: false,
    };
  }
  if (action.type == "GET_PROFILE_FAILED") {
    return {
      ...state,
      profile: null,
      loading: false,
    };
  }

  if (action.type == "START_CREATE_PROFILE") {
    console.log(action.payload);
    return {
      ...state,
      btnLoading: true,
    };
  }

  if (action.type == "CREATE_PROFILE") {
    console.log(action.payload);
    return {
      ...state,
      profile: action.payload,
      btnLoading: false,
    };
  }

  if (action.type == "ADD_EXPERIENCE_START") {
    return {
      ...state,
      btnLoading: true,
    };
  }

  if (action.type == "ADD_EXPERIENCE") {
    console.log(action.payload);
    return {
      ...state,
      profile: action.payload,
      btnLoading: false,
    };
  }

  if (action.type == "ADD_EDUCATION_START") {
    return {
      ...state,
      btnLoading: true,
    };
  }

  if (action.type == "ADD_EDUCATION") {
    console.log(action.payload);
    return {
      ...state,
      profile: action.payload,
      btnLoading: false,
    };
  }

  if (action.type == "ADD_EDUCATION_FAILED") {
    return {
      ...state,
      btnLoading: false,
    };
  }

  if (action.type == "DELETE_EDUCATION_START") {
    return {
      ...state,
      deleteButtons: [...state.deleteButtons, action.payload],
    };
  }

  if (action.type == "DELETE_EDUCATION") {
    // console.log(state.deleteButtons);
    // console.log(action.payload);
    return {
      ...state,
      profile: action.payload.data,
      btnLoading: false,
      deleteButtons: state.deleteButtons.filter(
        (el) => action.payload.edu_id != el
      ),
    };
  }

  if (action.type == "DELETE_EXPERIENCE_START") {
    return {
      ...state,
      deleteButtons: [...state.deleteButtons, action.payload],
    };
  }

  if (action.type == "DELETE_EXPERIENCE") {
    // console.log(state.deleteButtons);
    // console.log(action.payload);
    return {
      ...state,
      profile: action.payload.data,
      btnLoading: false,
      deleteButtons: state.deleteButtons.filter(
        (el) => action.payload.exp_id != el
      ),
    };
  }

  if (action.type == "GET_REPOS") {
    return {
      ...state,
      repos: action.payload,
    };
  }

  if (action.type == "CLEAR_PROFILE") {
    return {
      ...state,
      profile: "",
      loading: true,
      repos: [],
      profileLoading: true,
    };
  }

  return state;
};

export default ProfileReducer;
