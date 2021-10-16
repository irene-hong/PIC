import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_SINGLE_POST,
  CLEAR_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// 获取所有招聘帖
// GET /api/posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 点赞
// PUT /api/posts/like/postid
export const addLike = (postid) => async (dispatch) => {
  try {
    // console.dir(postid);
    const res = await axios.put(`/api/posts/like/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postid, likes: res.data },
    });
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data.msg);
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 取消点赞
// PUT /api/posts/unlike/postid
export const removeLike = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postid, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 删除招聘帖
// DELETE /api/posts/:postid
export const deletePost = (postid) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postid}`);
    dispatch({
      type: DELETE_POST,
      payload: postid,
    });
    dispatch(setAlert("招聘帖删除成功", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 发布招聘帖
// POST /api/posts
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/posts", formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    // dispatch(getAllPosts());
    dispatch(setAlert("发布成功！"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 获取单个招聘帖
// GET /api/posts/:postid
export const getSinglePost = (postid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postid}`);
    dispatch({
      type: GET_SINGLE_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 清除state.post，用于某些页面跳转
export const clearPost = () => (dispatch) => {
  dispatch({
    type: CLEAR_POST,
  });
};

// 添加评论
// POST /api/posts/comment/:postid
export const addComment = (postid, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/posts/comment/${postid}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("评论成功", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 删除评论
// DELETE /api/posts/comment/:postid/:commentid
export const removeComment = (postid, commentid) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postid}/${commentid}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentid,
    });
    dispatch(setAlert("评论删除成功"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
