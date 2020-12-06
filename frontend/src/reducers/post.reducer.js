const intialState = {
  posts: [],
  post: "",
  loading: true,
  btnLoading: false,
};

const PostReducer = (state = intialState, action) => {
  if (action.type == "GET_POSTS") {
    return {
      ...state,
      posts: action.payload,
      loading: false,
    };
  }

  if (action.type == "ADD_POST_START") {
    return {
      ...state,
      btnLoading: true,
    };
  }

  if (action.type == "ADD_POST") {
    let posts = [...state.posts];
    posts.unshift(action.payload);
    return {
      ...state,
      posts: posts,
      btnLoading: false,
    };
  }

  if (action.type == "POST_DELETE") {
    let posts = [...state.posts];
    let updatedPost = posts.filter((post) => {
      return post._id != action.payload;
    });
    return {
      ...state,
      posts: updatedPost,
    };
  }

  if (action.type == "POST_LIKE") {
    // let posts = [...state.posts];
    // let index = posts.findIndex((post) => post._id == action.payload.post_id);
    // posts[index].like = action.payload.like;

    return {
      ...state,
      posts: state.posts.map((post) =>
        post._id == action.payload.post_id
          ? { ...post, like: action.payload.like }
          : post
      ),
      //   posts: action.payload,
    };
  }

  if (action.type == "POST_UNLIKE") {
    console.log(action.payload);
    return {
      ...state,
      //   posts: action.payload,
      posts: state.posts.map((post) =>
        post._id == action.payload.post_id
          ? { ...post, like: action.payload.like }
          : post
      ),
    };
  }

  if (action.type == "GET_SINGLE_POST") {
    return {
      ...state,
      post: action.payload,
      loading: false,
    };
  }

  if (action.type == "CLEAR_POST") {
    return {
      ...state,
      post: "",
      loading: true,
    };
  }

  if (action.type == "ADD_COMMENT") {
    return {
      ...state,
      post: { ...state.post, comments: action.payload },
    };
  }

  if (action.type == "DELETE_COMMENT") {
    return {
      ...state,
      post: { ...state.post, comments: action.payload },
    };
  }
  return state;
};

export default PostReducer;
