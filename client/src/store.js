import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./redux/slices/productSlice";
import cartReducer from "./redux/slices/cartSlice";
import userReducer from "./redux/slices/userSlice";
import orderReducer from "./redux/slices/orderSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});
