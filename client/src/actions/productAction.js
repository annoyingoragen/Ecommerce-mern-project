import * as api from '../api/index';
import { productActions } from '../reducers/productReducer';


export const getProducts=(keyword='',currentPage=1,price=[0,25000],category,ratings=0)=> async (dispatch)=>{
    const sendRequest=async ()=>{
        if(category){
            console.log(ratings);
            const {data}=await api.fetchProductswithcategory(keyword,currentPage,price,category,ratings);
            return data;
        }
        console.log(ratings);
        const {data}=await api.fetchProducts(keyword,currentPage,price,ratings);
        return data;
    }
        try{
            dispatch(productActions.START_LOADING());
            const products=await sendRequest();
            console.log(products);  

            dispatch(productActions.FETCH_ALL_PRODUCTS(products));
            dispatch(productActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(productActions.FETCH_ALL_PRODUCTS_ERROR(error.response.data.message));

        }
}
export const clearErrors=()=> async (dispatch)=>{
    dispatch(productActions.CLEAR_ERRORS());
}

export const getProduct=(id)=> async (dispatch)=>{
    console.log(id);
    const sendRequest=async ()=>{
        const {data}=await api.fetchProduct(id);
        return data;
    }
        try{
            dispatch(productActions.START_LOADING());
            const data=await sendRequest();
            console.log(data);  

            dispatch(productActions.FETCH_PRODUCT(data));
            dispatch(productActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(productActions.FETCH_PRODUCT_ERROR(error.response.data.message));

        }
}

export const getAdminProducts=()=> async (dispatch)=>{
    const sendRequest=async ()=>{
        
        const {data}=await api.fetchAdminProducts();
        return data.products;
    }
        try{
            dispatch(productActions.START_LOADING());
            const products=await sendRequest();
            console.log(products);  

            dispatch(productActions.FETCH_ADMIN_PRODUCTS(products));
            dispatch(productActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(productActions.FETCH_ADMIN_PRODUCTS_ERROR(error.response.data.message));

        }
}


export const addAdminProduct=(productData)=>async(dispatch)=>{
    const sendRequest=async(productData)=>{
        const {data}=await api.addAdminProduct(productData);
        return data;
    };
    try {
        
        dispatch(productActions.START_LOADING());
        const data=await sendRequest(productData);
        console.log(data);
        dispatch(productActions.ADD_ADMIN_PRODUCT(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(productActions.ADD_ADMIN_PRODUCT_ERROR(error.response.data.message));
    }  
}


export const deleteAdminProduct=(id)=>async(dispatch)=>{
    const sendRequest=async(id)=>{
        const {data}=await api.deleteAdminProduct(id);
        return data;
    };
    try {
        
        dispatch(productActions.START_LOADING());
        const data=await sendRequest(id);
        console.log(data);
        dispatch(productActions.DELETE_ADMIN_PRODUCT(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(productActions.DELETE_ADMIN_PRODUCT_ERROR(error.response.data.message));
    }  
}


export const updateAdminProduct=(id,productData)=>async(dispatch)=>{
    const sendRequest=async(id,productData)=>{
        const {data}=await api.updateAdminProduct(id,productData);
        return data;
    };
    try {
        console.log(`produtc data ${productData.name}`);
        dispatch(productActions.START_LOADING());
        const data=await sendRequest(id,productData);
        console.log(data);
        dispatch(productActions.UPDATE_ADMIN_PRODUCT(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(productActions.UPDATE_ADMIN_PRODUCT_ERROR(error.response.data.message));
    }  
}