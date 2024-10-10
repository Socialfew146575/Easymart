import axios from "axios";
import {
  CLEAR_ERROR,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_DETAIL_FAILURE,
  UPDATE_USER_PASSWORD_FAILURE,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  CLEAR_MESSAGE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_REQUEST,
} from "../slices/userSlice";
import Cookies from "js-cookie";

const route = process.env.REACT_APP_API_URL;

export const login = (email, password) => async (dispatch) => {
  dispatch(LOGIN_REQUEST());

  try {
    const { data } = await axios.post(`${route}/login`, { email, password });
    const { token, user } = data;

    Cookies.set("token", token, { expires: 1 });
    dispatch(LOGIN_SUCCESS(user));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Login failed. Please try again.";
    dispatch(LOGIN_FAILURE(errorMessage));
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch(LOAD_USER_REQUEST());

  try {
    const { data } = await axios.get(`${route}/me`);
    const { user } = data;

    dispatch(LOAD_USER_SUCCESS(user));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Failed to load user. Please try again.";
    dispatch(LOAD_USER_FAILURE(errorMessage));
    dispatch(CLEAR_ERROR());
  }
};

export const register =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    dispatch(REGISTER_REQUEST());
    try {
      const name = `${firstName} ${lastName}`;
      const { data } = await axios.post(`${route}/register`, {
        name,
        email,
        password,
      });

      Cookies.set("token", data.token);
      dispatch(REGISTER_SUCCESS(data.user));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      dispatch(REGISTER_FAILURE(errorMessage));
      dispatch(CLEAR_ERROR());
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(FORGOT_PASSWORD_REQUEST());

  try {
    const { data } = await axios.post(`${route}/password/forgot`, { email });
    dispatch(FORGOT_PASSWORD_SUCCESS(data.message));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Failed to send password reset link.";
    dispatch(FORGOT_PASSWORD_FAILURE(errorMessage));
    dispatch(CLEAR_ERROR());
  }
};

export const resetPassword =
  ({ password, token, confirmPassword }) =>
  async (dispatch) => {
    dispatch(RESET_PASSWORD_REQUEST());

    try {
      const { data } = await axios.put(`${route}/password/reset/${token}`, {
        password,
        confirmPassword,
      });
      Cookies.set("token", data.token);
      dispatch(RESET_PASSWORD_SUCCESS(data.user));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Password reset failed. Please try again.";
      dispatch(RESET_PASSWORD_FAILURE(errorMessage));
      dispatch(CLEAR_ERROR());
    }
  };

export const updateUser =
  ({ firstName, lastName }) =>
  async (dispatch) => {
    dispatch(UPDATE_USER_DETAIL_REQUEST());

    try {
      const name = `${firstName} ${lastName}`;
      const { data } = await axios.put(`${route}/me/update`, { name });
      Cookies.set("token", data.token, { expires: 1 });
      dispatch(UPDATE_USER_DETAIL_SUCCESS(data.user));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update user details. Please try again.";
      dispatch(UPDATE_USER_DETAIL_FAILURE(errorMessage));
      dispatch(CLEAR_ERROR());
    }
  };

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    dispatch(UPDATE_USER_PASSWORD_REQUEST());

    try {
      const { data } = await axios.put(`${route}/password/update`, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      Cookies.set("token", data.token, { expires: 1 });
      dispatch(
        UPDATE_USER_PASSWORD_SUCCESS({
          user: data.user,
          message: "Password has been changed successfully",
        })
      );
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update password. Please try again.";
      dispatch(UPDATE_USER_PASSWORD_FAILURE(errorMessage));
    }
  };

export const logout = () => async (dispatch) => {
  dispatch(LOGOUT_USER_REQUEST());

  try {
    const { data } = await axios.get(`${route}/logout`);
    Cookies.remove("token");
    dispatch(LOGOUT_USER_SUCCESS(data.message));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Logout failed. Please try again.";
    dispatch(LOGOUT_USER_FAILURE(errorMessage));
  }
};
