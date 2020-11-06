import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
  } from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

let cartItemsFromStorage = [];
let userInfoFromStorage = {};
let shippingAddressFromStorage = null;

const validateDataFromStorage = (data) => {
  if (
    data !== "null" &&
    data !== null &&
    data !== undefined &&
    data !== "undefined"
  ) {
    return true;
  }
  return false;
};

try {
  //Ojo que el localstorage al parecer guarda TODO COMO TEXTO PLANO!!!!
  //Por lo tanto, si en chrome se ve que el localstorage ha guardado un valor como undefined
  //en realidad NO es el tipo undefined de JS sino el texto undefined
  cartItemsFromStorage = validateDataFromStorage(
    localStorage.getItem("cartItems")
  )
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  userInfoFromStorage = validateDataFromStorage(
    localStorage.getItem("userInfo")
  )
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  shippingAddressFromStorage = validateDataFromStorage(
    localStorage.getItem("shippingAddress")
  )
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
} catch (err) {
  console.log("Error en parseo del local storage");
  console.error("Localstorage horror: ", err);
}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  userDetails: {
    user: {},
  },
};
const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
