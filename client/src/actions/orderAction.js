import { orderActions } from "../reducers/orderReducer";
import * as api from '../api/index';


export const createOrder=(order)=>async(dispatch)=>{
    const sendRequest=async(order)=>{
        const {data}=await api.createOrder(order);
        return data;
    }
    try {
            dispatch(orderActions.START_LOADING());
            const data=await sendRequest(order);
            console.log(data);

            dispatch(orderActions.CREATE_ORDER(data));
            dispatch(orderActions.END_LOADING());

    } catch (error) {
        console.log(error);
        dispatch(orderActions.CREATE_ORDER_ERROR(error.response.data.message));

    }
}




export const myOrders=()=>async(dispatch)=>{
    const sendRequest=async()=>{
        const {data}=await api.myOrders();
        return data;
    }
    try {
            dispatch(orderActions.START_LOADING());
            const data=await sendRequest();
            console.log(data);

            dispatch(orderActions.MY_ORDERS(data.orders));
            dispatch(orderActions.END_LOADING());

    } catch (error) {
        console.log(error);
        dispatch(orderActions.MY_ORDERS_ERROR(error.response.data.message));

    }
}



export const getOrderDetails=(id)=>async(dispatch)=>{
    console.log("idd")
    const sendRequest=async(id)=>{
        const {data}=await api.getOrderDetails(id);
        return data;
    }
    try {
            dispatch(orderActions.START_LOADING());
            const data=await sendRequest(id);
            console.log(data);

            dispatch(orderActions.ORDER_DETAIL(data.order));
            dispatch(orderActions.END_LOADING());

    } catch (error) {
        console.log(error);
        dispatch(orderActions.ORDER_DETAIL_ERROR(error.response.data.message));

    }
}



export const clearErrors=()=> async (dispatch)=>{
    dispatch(orderActions.CLEAR_ERRORS());
}



export const getAdminOrders=()=> async (dispatch)=>{
    const sendRequest=async ()=>{
        
        const {data}=await api.fetchAdminOrders();
        return data.orders;
    }
        try{
            dispatch(orderActions.START_LOADING());
            const orders=await sendRequest();
            console.log(orders);  

            dispatch(orderActions.FETCH_ADMIN_ORDERS(orders));
            dispatch(orderActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(orderActions.FETCH_ADMIN_ORDERS_ERROR(error.response.data.message));

        }
}



export const deleteAdminOrder=(id)=>async(dispatch)=>{
    const sendRequest=async(id)=>{
        const {data}=await api.deleteAdminOrder(id);
        return data;
    };
    try {
        
        dispatch(orderActions.START_LOADING());
        const data=await sendRequest(id);
        console.log(data);
        dispatch(orderActions.DELETE_ADMIN_ORDER(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(orderActions.DELETE_ADMIN_ORDER_ERROR(error.response.data.message));
    }  
}


export const updateAdminOrder=(id,productData)=>async(dispatch)=>{
    const sendRequest=async(id,productData)=>{
        const {data}=await api.updateAdminOrder(id,productData);
        return data;
    };
    try {
        console.log(`order data ${productData}`);
        dispatch(orderActions.START_LOADING());
        const data=await sendRequest(id,productData);
        console.log(data);
        dispatch(orderActions.UPDATE_ADMIN_ORDER(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(orderActions.UPDATE_ADMIN_ORDER_ERROR(error.response.data.message));
    }  
}