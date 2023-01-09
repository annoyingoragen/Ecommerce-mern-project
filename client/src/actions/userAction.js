import * as api from '../api/index';
import { userAdminActions } from '../reducers/userAdminReducer';
import { userActions } from '../reducers/userReducer';


export const login=(formData)=> async (dispatch)=>{
    console.log(formData);
    const sendRequest=async ()=>{
        const {data}=await api.login(formData);
        return data.user;
    }
        try{
            dispatch(userActions.START_LOADING());
            const user=await sendRequest();
            console.log(user);  

            dispatch(userActions.REGISTER_LOGIN_LOAD(user));
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.REGISTER_LOGIN_LOAD_ERROR(error.response.data.message));

        }
}


export const clearErrors=()=> async (dispatch)=>{
    dispatch(userActions.CLEAR_ERRORS());
}


export const register=(formData)=> async (dispatch)=>{
    console.log(formData);
    const sendRequest=async ()=>{
        const {data}=await api.register(formData);
        return data.user;
    }
        try{
            dispatch(userActions.START_LOADING());
            const user=await sendRequest();
            console.log(user);  

            dispatch(userActions.REGISTER_LOGIN_LOAD(user));
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.REGISTER_LOGIN_LOAD_ERROR(error.response.data.message));

        }
}



export const loadUser=()=> async (dispatch)=>{
    
    const sendRequest=async ()=>{
        const {data}=await api.loadUser();
        return data.user;
    }
        try{
            dispatch(userActions.START_LOADING());
            const user=await sendRequest();
            console.log(user);  

            dispatch(userActions.REGISTER_LOGIN_LOAD(user));
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.REGISTER_LOGIN_LOAD_ERROR(error.response.data.message));

        }
}


export const logout=()=> async (dispatch)=>{
    
    const sendRequest=async ()=>{
        await api.logout();
       
    }
        try{
            dispatch(userActions.START_LOADING());
            await sendRequest(); 

            dispatch(userActions.LOGOUT());
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.RESET_PASSWORD_FORGOT_PASSWORD_UPDATE_PASSWORD_UPDATE_PROFILE_LOGOUT_ERROR(error.response.data.message));

        }
}


export const updateProfile=(formData)=> async (dispatch)=>{
    console.log(formData);
    const sendRequest=async ()=>{
        const {data}=await api.updateProfile(formData);
        return data;
    }
        try{
            dispatch(userActions.START_LOADING());
            const user=await sendRequest();
            console.log(user);  

            dispatch(userActions.UPDATE_PASSWORD_UPDATE_PROFILE(user));
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.RESET_PASSWORD_FORGOT_PASSWORD_UPDATE_PASSWORD_UPDATE_PROFILE_LOGOUT_ERROR(error.response.data.message));

        }
}


export const updatePassword=(passwords)=> async (dispatch)=>{
    console.log(passwords);
    const sendRequest=async ()=>{
        const {data}=await api.updatePassword(passwords);
        return data;
    }
        try{
            dispatch(userActions.START_LOADING());
            const user=await sendRequest();
            console.log(user);  

            dispatch(userActions.UPDATE_PASSWORD_UPDATE_PROFILE(user));
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.RESET_PASSWORD_FORGOT_PASSWORD_UPDATE_PASSWORD_UPDATE_PROFILE_LOGOUT_ERROR(error.response.data.message));

        }
}


export const forgotPassword=(email)=> async (dispatch)=>{
    console.log(email);
    const sendRequest=async ()=>{
        const {data}=await api.forgotPassword(email);
        return data;
    }
        try{
            dispatch(userActions.START_LOADING());
            const data=await sendRequest();
            console.log(data);  

            dispatch(userActions.FORGOT_PASSWORD(data.message));
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.RESET_PASSWORD_FORGOT_PASSWORD_UPDATE_PASSWORD_UPDATE_PROFILE_LOGOUT_ERROR(error.response.data.message));

        }
}



export const resetPassword=(token,passwords)=> async (dispatch)=>{
    console.log(passwords);
    const sendRequest=async ()=>{
        const {data}=await api.resetPassword(token,passwords);
        return data;
    }
        try{
            dispatch(userActions.START_LOADING());
            const data=await sendRequest();
            console.log(data);  

            dispatch(userActions.RESET_PASSWORD(data.success));
            dispatch(userActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userActions.RESET_PASSWORD_FORGOT_PASSWORD_UPDATE_PASSWORD_UPDATE_PROFILE_LOGOUT_ERROR(error.response.data.message));

        }
}


export const fetchAdminUsers=()=> async (dispatch)=>{
    
    const sendRequest=async ()=>{
        const {data}=await api.fetchAdminUsers();
        return data.users;
    }
        try{
            dispatch(userAdminActions.START_LOADING());
            const users=await sendRequest();
            console.log(users);  

            dispatch(userAdminActions.FETCH_ADMIN_USERS(users));
            dispatch(userAdminActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userAdminActions.FETCH_ADMIN_USERS_ERROR(error.response.data.message));

        }
}


export const fetchAdminUser=(id)=> async (dispatch)=>{
    
    const sendRequest=async (id)=>{
        const {data}=await api.fetchAdminUser(id);
        return data.user;
    }
        try{
            dispatch(userAdminActions.START_LOADING());
            const user=await sendRequest(id);
            console.log(user);  

            dispatch(userAdminActions.FETCH_ADMIN_USER(user));
            dispatch(userAdminActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(userAdminActions.FETCH_ADMIN_USER_ERROR(error.response.data.message));

        }
}

export const deleteAdminUser=(id)=>async(dispatch)=>{
    const sendRequest=async(id)=>{
        const {data}=await api.deleteAdminUser(id);
        return data;
    };
    try {
        
        dispatch(userAdminActions.START_LOADING());
        const data=await sendRequest(id);
        console.log(data);
        dispatch(userAdminActions.DELETE_ADMIN_USER(data));
        
        dispatch(userAdminActions.END_LOADING());
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(userAdminActions.DELETE_ADMIN_USER_ERROR(error.response.data.message));
    }  
}


export const updateAdminUser=(id,userData)=>async(dispatch)=>{
    const sendRequest=async(id,userData)=>{
        const {data}=await api.updateAdminUser(id,userData);
        return data;
    };
    try {
        console.log(`produtc data ${userData.name}`);
        dispatch(userAdminActions.START_LOADING());
        const data=await sendRequest(id,userData);
        console.log(data);
        dispatch(userAdminActions.UPDATE_ADMIN_USER(data));
        
        dispatch(userAdminActions.END_LOADING(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(userAdminActions.UPDATE_ADMIN_USER_ERROR(error.response.data.message));
    }  
}

export const clearErrorsAdmin=()=> async (dispatch)=>{
    dispatch(userAdminActions.CLEAR_ERRORS());
}