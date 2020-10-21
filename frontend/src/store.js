import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { userLoginReducer, userRegisterReducer,userDetailsReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { cartReducer } from './reducers/cartReducers';


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});

let cartItemsFromStorage = null;
let userInfoFromStorage = null;
let shippingAddressFromStorage = null;

try{
    //Ojo que el localstorage al parecer guarda TODO COMO TEXTO PLANO!!!!
    //Por lo tanto, si en chrome se ve que el localstorage ha guardado un valor como undefined
    //en realidad NO es el tipo undefined de JS sino el texto undefined
    cartItemsFromStorage = localStorage.getItem('cartItems') !== "undefined" ? 
    JSON.parse(localStorage.getItem('cartItems')): [];

    userInfoFromStorage = localStorage.getItem('userInfo') !== "undefined"? 
    JSON.parse(localStorage.getItem('userInfo')): null;

    shippingAddressFromStorage = localStorage.getItem('shippingAddress') !== "undefined"? 
    JSON.parse(localStorage.getItem('shippingAddress')): {};
    
}catch(err){
    console.log("Error en parseo del local storage");
    console.error("Localstorage horror: ", err);
   
}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
};
const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;