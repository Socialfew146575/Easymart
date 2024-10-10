import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
  ADD_SHIPPING_INFO,
} from "../slices/cartSlice";

export const addToCart = (product, quantity) => (dispatch) => {
  dispatch(ADD_TO_CART({ product, quantity }));
};

export const removeFromCart = (id) => (dispatch) => {
  console.log("id", id);
  dispatch(REMOVE_FROM_CART({ id }));
};

export const increment = (id) => (dispatch) => {
  dispatch(INCREMENT({ id }));
};

export const decrement = (id) => (dispatch) => {
  dispatch(DECREMENT({ id }));
};

export const addShipingInfo = (shippingInfo) => (dispatch) => {
  dispatch(ADD_SHIPPING_INFO(shippingInfo));
};
