import * as api from '../api/index';
import { cartActions } from '../reducers/cartReducer';



export const additemToCart=(itemId,quantity)=>async(dispatch,getState)=>{
    const sendRequest=async()=>{
        const {data}=await api.fetchProduct(itemId);
        return data;
    }
    try {
            // dispatch(cartActions.START_LOADING());
            const data=await sendRequest();
            console.log(data.product);  

            dispatch(cartActions.ADD_TO_CART({
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
            }));
            // dispatch(cartActions.END_LOADING());
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log(error)
    }
} 

export const removeItemFromCart=(itemId)=>async(dispatch,getState)=>{
    try {
        

        dispatch(cartActions.REMOVE_ITEM_FROM_CART(itemId));
       
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    } catch (error) {
    console.log(error)
    }
}


export const saveShippingInfo=(data)=>async(dispatch)=>{
    dispatch(cartActions.SAVE_SHIPPING_INFO(data));
    localStorage.setItem("shippingInfo",JSON.stringify(data));
    
}