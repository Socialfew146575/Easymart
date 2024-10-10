import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  ordersCount: 0,
  messge : null
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    GET_USER_ORDERS_LOADING: (state, action) => {
      state.loading = true;
    },
    GET_USER_ORDERS_SUCCESS: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.ordersCount = action.payload.length;
      state.error = null;
    },
    GET_USER_ORDERS_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    GET_USER_ORDER_LOADING: (state, action) => {
      state.loading = true;
    },
    GET_USER_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    },
    GET_USER_ORDER_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CREATE_USER_ORDER_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    CREATE_USER_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.error = null;
      state.order = action.payload;
      state.message = "Your order has been placed successfully!"; // Success message to show the user
    },
    CREATE_USER_ORDER_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message =
        "There was an issue placing your order. Please try again."; // Failure message to show the user
    },

    CLEAR_ALL_ERROR: (state, action) => {
      state.error = null;
    },
  },
});




export const {
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDER_FAILURE,
  GET_USER_ORDERS_LOADING,
  GET_USER_ORDER_LOADING,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDERS_SUCCESS,
  CREATE_USER_ORDER_REQUEST,
  CREATE_USER_ORDER_FAILURE,
  CREATE_USER_ORDER_SUCCESS,
  CLEAR_ALL_ERROR,
} = orderSlice.actions;


export default orderSlice.reducer