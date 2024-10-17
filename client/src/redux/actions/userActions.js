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

const cookieOptions = {
  expires: 1, // Cookie expires in 1 day
  sameSite: "None", // Allows cross-site cookies
  secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
};

// Login User
export const login = (email, password) => async (dispatch) => {
  dispatch(LOGIN_REQUEST());

  try {
    const { data } = await axios.post(
      `${route}/login`,
      { email, password },
      { withCredentials: true } // Include credentials
    );
    const { token, user } = data;

    // console.log(token);
    Cookies.set("token", token, cookieOptions);

    // console.log("Cookie", Cookies.get("token"));

    dispatch(LOGIN_SUCCESS(user));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Login failed. Please try again.";
    dispatch(LOGIN_FAILURE(errorMessage));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch(LOAD_USER_REQUEST());

  try {
    const { data } = await axios.get(`${route}/me`, { withCredentials: true }); // Include credentials
    const { user } = data;

    // console.log("user", user);

    dispatch(LOAD_USER_SUCCESS(user));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Failed to load user. Please try again.";
    dispatch(LOAD_USER_FAILURE(errorMessage));
    dispatch(CLEAR_ERROR());
  }
};

// Register User
export const register =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    dispatch(REGISTER_REQUEST());

    try {
      const name = `${firstName} ${lastName}`;
      const { data } = await axios.post(
        `${route}/register`,
        { name, email, password },
        { withCredentials: true } // Include credentials
      );

      Cookies.set("token", data.token, cookieOptions);

      dispatch(REGISTER_SUCCESS(data.user));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      dispatch(REGISTER_FAILURE(errorMessage));
      dispatch(CLEAR_ERROR());
    }
  };

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(FORGOT_PASSWORD_REQUEST());

  try {
    const { data } = await axios.post(
      `${route}/password/forgot`,
      { email },
      { withCredentials: true } // Include credentials
    );
    dispatch(FORGOT_PASSWORD_SUCCESS(data.message));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Failed to send password reset link.";
    dispatch(FORGOT_PASSWORD_FAILURE(errorMessage));
    dispatch(CLEAR_ERROR());
  }
};

// Reset Password
export const resetPassword =
  ({ password, token, confirmPassword }) =>
  async (dispatch) => {
    dispatch(RESET_PASSWORD_REQUEST());

    try {
      const { data } = await axios.put(
        `${route}/password/reset/${token}`,
        { password, confirmPassword },
        { withCredentials: true } // Include credentials
      );

      Cookies.set("token", data.token, cookieOptions);
      dispatch(RESET_PASSWORD_SUCCESS(data.user));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Password reset failed. Please try again.";
      dispatch(RESET_PASSWORD_FAILURE(errorMessage));
      dispatch(CLEAR_ERROR());
    }
  };

// Update User Details
export const updateUser =
  ({ firstName, lastName }) =>
  async (dispatch) => {
    dispatch(UPDATE_USER_DETAIL_REQUEST());

    try {
      const name = `${firstName} ${lastName}`;
      const { data } = await axios.put(
        `${route}/me/update`,
        { name },
        { withCredentials: true } // Include credentials
      );

      Cookies.set("token", data.token, cookieOptions);
      dispatch(UPDATE_USER_DETAIL_SUCCESS(data.user));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update user details. Please try again.";
      dispatch(UPDATE_USER_DETAIL_FAILURE(errorMessage));
      dispatch(CLEAR_ERROR());
    }
  };

// Update User Password
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    dispatch(UPDATE_USER_PASSWORD_REQUEST());

    try {
      const { data } = await axios.put(
        `${route}/password/update`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true } // Include credentials
      );

      Cookies.set("token", data.token, cookieOptions);
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

// Logout User
export const logout = () => async (dispatch) => {
  dispatch(LOGOUT_USER_REQUEST());

  try {
    const { data } = await axios.get(`${route}/logout`, {
      withCredentials: true,
    }); // Include credentials
    Cookies.remove("token");
    dispatch(LOGOUT_USER_SUCCESS(data.message));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Logout failed. Please try again.";
    dispatch(LOGOUT_USER_FAILURE(errorMessage));
  }
};
