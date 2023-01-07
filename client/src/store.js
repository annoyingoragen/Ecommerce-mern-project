import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './reducers/cartReducer';
import orderSlice from './reducers/orderReducer';
import productSlice from './reducers/productReducer';
import reviewSlice from './reducers/reviewReducer';
import userAdminSlice from './reducers/userAdminReducer';
import userSlice from './reducers/userReducer';


const store=configureStore({
    reducer:{
        products:productSlice.reducer,
        user:userSlice.reducer,
        cart:cartSlice.reducer,
        order:orderSlice.reducer,
        review:reviewSlice.reducer,
        userAdmin:userAdminSlice.reducer,
        
    }
});



export default store;