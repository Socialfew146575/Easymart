import axios from "axios";
import {
  CREATE_USER_ORDER_FAILURE,
  CREATE_USER_ORDER_REQUEST,
  CREATE_USER_ORDER_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDERS_LOADING,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDER_FAILURE,
  GET_USER_ORDER_LOADING,
  GET_USER_ORDER_SUCCESS,
} from "../slices/orderSlice";
import { CLEAR_CART } from "../slices/cartSlice";
const route = process.env.REACT_APP_API_URL;

export const getUserOrders = () => async (dispatch) => {
  dispatch(GET_USER_ORDERS_LOADING());

  try {
    const { data } = await axios.get(`${route}/orders/me`, {
      withCredentials: true,
    });

    dispatch(GET_USER_ORDERS_SUCCESS(data.orders));
  } catch (error) {
    dispatch(
      GET_USER_ORDERS_FAILURE(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const getUserOrder = (id) => async (dispatch) => {
  dispatch(GET_USER_ORDER_LOADING());

  try {
    const { data } = await axios.get(`${route}/order/${id}`, {
      withCredentials: true,
    });
    // console.log(data)
    dispatch(GET_USER_ORDER_SUCCESS(data.order));
  } catch (error) {
    dispatch(
      GET_USER_ORDER_FAILURE(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const createUserOrder =
  ({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  }) =>
  async (dispatch) => {
    dispatch(CREATE_USER_ORDER_REQUEST());

    // console.log(
    //   shippingInfo,
    //   orderItems,
    //   paymentInfo,
    //   itemsPrice,
    //   taxPrice,
    //   shippingPrice,
    //   totalPrice
    // );

    try {
      const { data } = await axios.post(
        `${route}/order/new`,
        {
          shippingInfo,
          orderItems,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(CREATE_USER_ORDER_SUCCESS(data.order));

      // Clear cart
      dispatch(CLEAR_CART());

      // Remove order info and shipping info from sessionStorage
      sessionStorage.removeItem("easymart_order_info");
      sessionStorage.removeItem("easymart_confirm_order");
    } catch (error) {
      dispatch(
        CREATE_USER_ORDER_FAILURE(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
