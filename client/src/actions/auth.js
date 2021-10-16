import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// 加载用户
// GET /api/auth
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data, // user object
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// 注册用户
// POST /api/users
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      // console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, // token
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// 登录
// POST /api/auth
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    // console.log(body);

    try {
      const res = await axios.post("/api/auth", body, config);
      // console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, // token
      });

      dispatch(loadUser());
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// 登出
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
