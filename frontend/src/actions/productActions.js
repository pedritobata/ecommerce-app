import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";
import axios from "../axios";

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const response = await axios.get("/api/products");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("error>>>", error.response && error.response.data);
      console.error("error>>>", error.request);
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const productDetails = (id) => {
  return async dispatch => {
    try{
      dispatch({type: PRODUCT_DETAILS_REQUEST});
      const response = await axios.get(`/api/products/${id}`);
      dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: response.data});
    }catch(error){
      dispatch({type: PRODUCT_DETAILS_FAIL, 
        payload: error.response && error.response.data.message ? 
        error.response.data.message : error.message
      })
    }
  }
};
