import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("easymart_cart")) || [];
    return cart;
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return [];
  }
};

const loadConfirmOrderFromSessionStorage = () => {
  try {
    const confirmedOrder =
      JSON.parse(sessionStorage.getItem("easymart_confirm_order")) || false;
    return confirmedOrder;
  } catch (error) {
    console.error("Failed to load confirmedOrder from sessionStorage", error);
    return false;
  }
};

const loadShippingInfoFromLocalStorage = () => {
  try {
    const shippingInfo = JSON.parse(
      localStorage.getItem("easymart_shipping_info")
    ) || {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "India",
    };

    return shippingInfo;
  } catch (error) {
    console.error("Failed to load shippingInfo from localStorage", error);
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "India",
    };
  }
};

// Initial state
const initialState = {
  cart: loadCartFromLocalStorage(), // Array of cartItem objects
  cartItemsCount: loadCartFromLocalStorage().length,
  error: null,
  shippingInfo: loadShippingInfoFromLocalStorage(),
  confirmedOrder: loadConfirmOrderFromSessionStorage(),
};

// Helper function to find item index and handle errors
const findItemIndex = (state, id) => {
  const itemIndex = state.cart.findIndex((item) => item.product._id === id);
  if (itemIndex === -1) {
    state.error = "Product not present in cart...";
  }
  return itemIndex;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product._id === product._id
      );
      console.log(existingItem);
      state.error = null; // Reset error
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
        state.cartItemsCount += 1;
        localStorage.setItem("easymart_cart", JSON.stringify(state.cart));
      }
    },
    REMOVE_FROM_CART: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      const itemIndex = findItemIndex(state, id);
      console.log(itemIndex);
      if (itemIndex !== -1) {
        state.cart.splice(itemIndex, 1);
        state.cartItemsCount -= 1;
        state.error = null; // Reset error
        localStorage.setItem("easymart_cart", JSON.stringify(state.cart));
      }
    },
    INCREMENT: (state, action) => {
      const { id } = action.payload;
      const itemIndex = findItemIndex(state, id);
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += 1;
        state.error = null; // Reset error
        localStorage.setItem("easymart_cart", JSON.stringify(state.cart));
      }
    },
    DECREMENT: (state, action) => {
      const { id } = action.payload;
      const itemIndex = findItemIndex(state, id);
      if (itemIndex !== -1) {
        if (state.cart[itemIndex].quantity === 1) {
          state.cart.splice(itemIndex, 1);
          state.cartItemsCount -= 1;
        } else {
          state.cart[itemIndex].quantity -= 1;
        }
        state.error = null; // Reset error
        localStorage.setItem("easymart_cart", JSON.stringify(state.cart));
      }
    },
    ADD_SHIPPING_INFO: (state, action) => {
      localStorage.setItem(
        "easymart_shipping_info",
        JSON.stringify(action.payload)
      );
    },
    CONFIRM_ORDER: (state, action) => {
      state.confirmedOrder = true;
      sessionStorage.setItem("easymart_confirm_order", true);
    },
    CANCEL_ORDER: (state, action) => {
      state.confirmedOrder = false;
      sessionStorage.setItem("easymart_confirm_order", false);
    },
    CLEAR_CART: (state, action) => {
      localStorage.removeItem("easymart_cart");
    },
  },
});

export const {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
  ADD_SHIPPING_INFO,
  CONFIRM_ORDER,
  CANCEL_ORDER,
  CLEAR_CART
} = cartSlice.actions;
export default cartSlice.reducer;
