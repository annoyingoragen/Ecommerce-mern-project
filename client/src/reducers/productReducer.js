import { createSlice } from '@reduxjs/toolkit';




const productSlice=createSlice({
    name:'products',
    initialState:{
        products:[],
        isLoading:null,
        error:null,
        productCount:null,
        product:{},
        resultPerPage:null,
        filteredProductCount:null,
        success:null,
        isDeleted:false,
        isUpdated:false,
    },
    reducers:{
        START_LOADING(state,action){
            state.isLoading=true;
        },
        END_LOADING(state,action){
            state.isLoading=false;
        },
        FETCH_ALL_PRODUCTS(state,action){
            console.log('fetcing all produts');
            console.log(action.payload.productCount);
            state.products=action.payload.products;
            state.productCount=action.payload.productCount;
            state.resultPerPage=action.payload.resultPerPage;
            state.filteredProductCount=action.payload.filteredProductCount;
        },
        FETCH_ALL_PRODUCTS_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        FETCH_PRODUCT(state,action){
            console.log('fetcing produt');
            console.log(action.payload);
            
            state.product=action.payload.product;
        },
        FETCH_PRODUCT_ERROR(state,action){
            state.isLoading=false;
            state.error=action.payload;      
        },
        FETCH_ADMIN_PRODUCTS(state,action){
            state.products=action.payload;
        },
        FETCH_ADMIN_PRODUCTS_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        ADD_ADMIN_PRODUCT(state,action){
            console.log('adding produt');
            console.log(action.payload);
            state.success=action.payload.success;
            state.product=action.payload.product;
        },
        ADD_ADMIN_PRODUCT_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        ADD_ADMIN_PRODUCT_RESET(state,action){
            state.success=false;
        },
        DELETE_ADMIN_PRODUCT(state,action){
            console.log('deleting produt');
            console.log(action.payload);
            state.isDeleted=action.payload;
        },
        DELETE_ADMIN_PRODUCT_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        DELETE_ADMIN_PRODUCT_RESET(state,action){
            state.isDeleted=false;
        },
        UPDATE_ADMIN_PRODUCT(state,action){
            console.log('deleting produt');
            console.log(action.payload);
            state.isUpdated=action.payload;
        },
        UPDATE_ADMIN_PRODUCT_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        UPDATE_ADMIN_PRODUCT_RESET(state,action){
            state.isUpdated=false;
        },
        CLEAR_ERRORS(state){
            state.error=null;  
        },
      
    }

});

export const productActions=productSlice.actions;
export default productSlice;