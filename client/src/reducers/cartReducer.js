import { createSlice } from '@reduxjs/toolkit';


const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:
            localStorage.getItem("cartItems") ? 
            JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo:
            localStorage.getItem("shippingInfo") ? 
            JSON.parse(localStorage.getItem("shippingInfo")) :{}
    },
    reducers:{
      
        ADD_TO_CART(state,action){
            console.log('adding to cart');
            console.log(action.payload);
            const item=action.payload
            const isItemExist=state.cartItems.find((i)=>i.product===item.product);
            
            if(isItemExist){
                state.cartItems=state.cartItems.map((i)=>(i.product===isItemExist.product? item:i));
            }else{
                state.cartItems=[...state.cartItems,item];
            }

            
        },    
        REMOVE_ITEM_FROM_CART(state,action){
            state.cartItems=state.cartItems.filter((i)=>(i.product!==action.payload));
        },  
        
        CLEAR_ERRORS(state){
            state.error=null;  
        },

        SAVE_SHIPPING_INFO(state,action){
            state.shippingInfo=action.payload;
        },
    }

});

export const cartActions=cartSlice.actions;
export default cartSlice;