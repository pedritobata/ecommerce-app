import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import axios from '../axios';

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                price: data.price,
                image: data.image,
                countInStock: data.countInStock,
                qty
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cartItems));
    }
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
};