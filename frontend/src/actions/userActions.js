import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
