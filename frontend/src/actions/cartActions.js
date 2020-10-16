import { CART_ADD_ITEM } from '../constants/cartConstants';
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