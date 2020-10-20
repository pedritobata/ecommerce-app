import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_RESET
} from "../constants/userConstants";
import axios from "../axios";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const response = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      {
        "Content-Type": "application/json",
      }
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT,
    });
  };
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const response = await axios.post(
      "/api/users",
      {
        name,
        email,
        password,
      },
      {
        "Content-Type": "application/json",
      }
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data,
      });

    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { userLogin: {userInfo}} = getState();


    const response = await axios.get(
      `/api/users/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
        }
      }
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: response.data,
    });

   
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const userUpdateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {userLogin: {userInfo}} = getState();

    console.log("userUpdateProfile", userInfo);

    const response = await axios.put(
      "/api/users/profile",
      user,
      {
       headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
       }
      }
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: response.data,
    });

   
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};