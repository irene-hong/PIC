import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
} from "./types";

// 获得当前用户的档案
// GET /api/profile/me
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 获得所有用户的档案
// GET /api/profile
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });

  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 根据用户ID获取档案
// GET /api/profile/:uid
export const getProfileById = (uid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${uid}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 创建、编辑档案
// POST /api/profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      // edit===true 编辑已有档案
      // edit===false 创建新的档案
      dispatch(setAlert(edit ? "档案已更新！" : "档案已创建！"));
      // // 如果是编辑已有档案，编辑完成后停留在原有页面；
      // // 如果是创建新档案，创建完成后转回/dashboard
      // if (!edit){
      //     history.push('/dashboard');
      // }
      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

// 添加职业经历
// PUT /api/profile/experience
export const addProfExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/professional", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("经历添加成功！"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 添加教育经历
// PUT /api/profile/experience
export const addEduExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("经历添加成功！"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 删除一条职业经历
// DELETE /api/profile/professional/:expid
export const deleteProfExperience = (expid, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/professional/${expid}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("删除职业经历成功！"));
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// 删除一条教育经历
// DELETE /api/profile/education/:expid
export const deleteEduExperience = (expid) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${expid}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("删除教育经历成功！"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
