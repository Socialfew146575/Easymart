import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAILURE,
  SIMILAR_PRODUCT_REQUEST,
  SIMILAR_PRODUCT_SUCCESS,
} from "../slices/productSlice";

import Cookies from "js-cookie";

const route = process.env.REACT_APP_API_URL;

export const getAllProducts =
  (
    keyword = "",
    currentPage = 1,
    category,
    priceRange = [0, 12000],
    rating = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch(ALL_PRODUCT_REQUEST());

      console.log("keyword",keyword);
      console.log("category", category);
      
      let link = `${route}/products?page=${currentPage}&keyword=${keyword}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte] = ${rating}`;

      if (category) {
        link = `${route}/products?page=${currentPage}&keyword=${keyword}&category=${category}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte] = ${rating}`;
      }

      const { data } = await axios.get(link);
    
      dispatch(
        ALL_PRODUCT_SUCCESS({
          products: data.products,
          productsCount: data.productsCount,
          resultPerPage: data.resultPerPage,
          filteredProductsCount: data.filteredProductsCount,
        })
      );
    } catch (error) {
      dispatch(
        ALL_PRODUCT_FAIL({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      );
    }
  };

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch(SINGLE_PRODUCT_REQUEST());

    const { data } = await axios.get(`${route}/product/${id}`);

    dispatch(SINGLE_PRODUCT_SUCCESS(data.product));
  } catch (error) {
    dispatch(
      SINGLE_PRODUCT_FAIL({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};


export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch(GET_PRODUCT_REVIEWS_REQUEST()); // Dispatch request action

    const { data } = await axios.get(`${route}/reviews?id=${id}`); // Append id as a query param

    dispatch(GET_PRODUCT_REVIEWS_SUCCESS(data.reviews)); // Dispatch success action with data
  } catch (error) {
    dispatch(
      GET_PRODUCT_REVIEWS_FAILURE({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    ); // Dispatch failure action with error message
  }
};


export const getSimilarProducts = (category) => async(dispatch)=>{


   try {
     dispatch(SIMILAR_PRODUCT_REQUEST());

    const keyword = "";
      const currentPage = 1;
    
      const priceRange = [0, 12000];
      const rating = 0;
    
       const link = `${route}/products?page=${currentPage}&keyword=${keyword}&category=${category}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte] = ${rating}`;
     

     const { data } = await axios.get(link);

     dispatch(
       SIMILAR_PRODUCT_SUCCESS({
         products: data.products,
  
       })
     );
   } catch (error) {
     dispatch(
       SIMILAR_PRODUCT_SUCCESS({
         error:
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message,
       })
     );
   }




}



