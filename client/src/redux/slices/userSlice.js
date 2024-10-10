import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  users: [],
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  message: "",
};

const userSlice = createSlice({
  name: "users",
  initialState: initialValue,
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = state.user?.role === "admin";
      state.error = null;
    },
    LOGIN_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
    },
    REGISTER_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    REGISTER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = state.user?.role === "admin";
      state.error = null;
    },
    REGISTER_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
    },
    LOAD_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.isAdmin = false;

      state.user = null;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = state.user?.role === "admin";
      state.error = null;
    },
    LOAD_USER_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
    },
    FORGOT_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    FORGOT_PASSWORD_FAILURE: (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.payload;
    },
    RESET_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.isAdmin = false;

      state.user = null;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = state.user?.role === "admin";
      state.error = null;
    },
    RESET_PASSWORD_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
    },
    UPDATE_USER_DETAIL_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    UPDATE_USER_DETAIL_SUCCESS: (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = state.user?.role === "admin";
    },
    UPDATE_USER_DETAIL_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UPDATE_USER_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    UPDATE_USER_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAdmin = state.user?.role === "admin";
    },
    UPDATE_USER_PASSWORD_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LOGOUT_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    LOGOUT_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = null;
      state.isAuthenticated = false;
      state.message = action.payload;
    },
    LOGOUT_USER_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
    CLEAR_MESSAGE: (state, action) => {
      state.message = null;
    },
  },
});

export const {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  CLEAR_ERROR,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_FAILURE,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_FAILURE,
  UPDATE_USER_PASSWORD_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  CLEAR_MESSAGE,
} = userSlice.actions;

export default userSlice.reducer;
