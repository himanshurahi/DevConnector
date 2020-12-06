import axios from "axios";

export const getPosts = () => {
  return function (dispatch) {
    axios
      .get("/api/post")
      .then((res) => {
        dispatch({ type: "GET_POSTS", payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: "GET_POSTS_FAILED" });
      });
  };
};

export const addLike = (post_id) => {
  return function (dispatch) {
    axios
      .post("/api/post/like/" + post_id)
      .then((res) => {
        dispatch({
          type: "POST_LIKE",
          payload: { post_id, like: res.data.like },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "POST_LIKE_ERROR" });
      });
  };
};

export const removeLike = (post_id) => {
  return function (dispatch) {
    axios
      .post("/api/post/unlike/" + post_id)
      .then((res) => {
        dispatch({
          type: "POST_UNLIKE",
          payload: { post_id, like: res.data.like },
        });
      })
      .catch((error) => {
        dispatch({ type: "POST_UNLIKE_ERROR" });
      });
  };
};

export const getSinglePost = (post_id, props) => {
  return function (dispatch) {
    axios
      .get("/api/post/" + post_id)
      .then((res) => {
        dispatch({
          type: "GET_SINGLE_POST",
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({ type: "GET_SINGLE_POST_FAILED" });
        props.history.push("/");
      });
  };
};

export const addComment = (post_id, data) => {
  return function (dispatch) {
    axios
      .post("/api/post/comment/" + post_id, data)
      .then((res) => {
        dispatch({
          type: "ADD_COMMENT",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "ADD_COMMENT_FAILED" });
      });
  };
};

export const deleteComment = (post_id, data) => {
  return function (dispatch) {
    axios
      .delete("/api/post/comment/" + post_id, {
        data: data,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "DELETE_COMMENT",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "DELETE_COMMENT_FAILED" });
      });
  };
};

export const addPost = (data, props) => {
  return function (dispatch) {
    dispatch({ type: "ADD_POST_START" });
    axios
      .post("/api/post", data)
      .then((res) => {
        dispatch({
          type: "ADD_POST",
          payload: res.data,
        });
        props.history.push("/posts");
      })
      .catch((error) => {
        dispatch({ type: "ADD_POST_FAILED" });
      });
  };
};

export const deletePost = (post_id) => {
  return function (dispatch) {
    axios
      .delete("/api/post/" + post_id)
      .then((res) => {
        dispatch({
          type: "POST_DELETE",
          payload: post_id,
        });
      })
      .catch((error) => {
        dispatch({ type: "POST_DELETE_FAILED" });
      });
  };
};
