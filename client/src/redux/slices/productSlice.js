import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  product: {},
  resultPerPage: 0,
  filteredProductsCount: 0,
  reviews : null,
  similarProducts:[]
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ALL_PRODUCT_REQUEST: (state) => {
      state.loading = true;
      state.products = [];
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount
     
    },
    ALL_PRODUCT_FAIL: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    }, SIMILAR_PRODUCT_REQUEST: (state) => {
      state.loading = true;
      state.similarProducts = [];
    },
    SIMILAR_PRODUCT_SUCCESS: (state, action) => {
      state.loading = false;
      state.similarProducts = action.payload.products;
      
     
    },
    SIMILAR_PRODUCT_FAIL: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    SINGLE_PRODUCT_REQUEST:(state,action)=>{
      state.loading = true;
      

    },
    SINGLE_PRODUCT_SUCCESS:(state,action)=>{
      state.loading = false;
      state.product = action.payload

    },
    SINGLE_PRODUCT_FAIL:(state,action)=>{
      state.loading = false;
      state.error = action.payload.error

    },
    GET_PRODUCT_REVIEWS_REQUEST : (state,action)=>{

      state.loading = true;

    },
    GET_PRODUCT_REVIEWS_SUCCESS : (state,action)=>{

      state.loading = false;
      state.reviews = action.payload

    },

    GET_PRODUCT_REVIEWS_FAILURE : (state,action)=>{

      state.loading = false;
      state.reviews = null;
      state.error = action.payload

    },

    



    CLEAR_ALL_ERROR:(state,action)=>{

      state.error = null;

    }
  },
});

// Export the actions
export const {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  CLEAR_ALL_ERROR,
  GET_PRODUCT_REVIEWS_FAILURE,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  SIMILAR_PRODUCT_FAIL,
  SIMILAR_PRODUCT_REQUEST,
  SIMILAR_PRODUCT_SUCCESS

} = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
