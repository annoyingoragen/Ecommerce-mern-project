import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:'order',
    initialState:{
            isLoading:null,
            error:null,
            order:null,
            orders:[], 
            orderDetails:{},
            isUpdated:false,
            isDeleted:false, 
    },
    reducers:{
        ORDER_DETAIL(state,action){
            state.orderDetails=action.payload;
       },
       ORDER_DETAIL_ERROR(state,action){
           state.isLoading=false;
           state.error=action.payload; 
      },
        START_LOADING(state,action){
            state.isLoading=true;
        },
        CREATE_ORDER(status,action){
            status.order=action.payload;
        },
        CREATE_ORDER_ERROR(state,action){
            state.isLoading=false;
            state.error=action.payload;
        },
        MY_ORDERS(state,action){
             state.orders=action.payload;
        },
        MY_ORDERS_ERROR(state,action){
            state.isLoading=false;
            state.error=action.payload; 
       },
        END_LOADING(state,action){
            state.isLoading=false;
        },
        FETCH_ADMIN_ORDERS(state,action){
            state.orders=action.payload;
        },
        FETCH_ADMIN_ORDERS_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        DELETE_ADMIN_ORDER(state,action){
            console.log('deleting produt');
            console.log(action.payload);
            state.isDeleted=action.payload;
        },
        DELETE_ADMIN_ORDER_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        DELETE_ADMIN_ORDER_RESET(state,action){
            state.isDeleted=false;
        },
        UPDATE_ADMIN_ORDER(state,action){
            console.log('deleting produt');
            console.log(action.payload);
            state.isUpdated=action.payload;
        },
        UPDATE_ADMIN_ORDER_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        UPDATE_ADMIN_ORDER_RESET(state,action){
            state.isUpdated=false;
        },
        CLEAR_ERRORS(state){
            state.error=null;  
        },

    }
});

export const orderActions=orderSlice.actions;
export default orderSlice