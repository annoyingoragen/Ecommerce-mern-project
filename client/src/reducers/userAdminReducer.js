import { createSlice } from '@reduxjs/toolkit';


const userAdminSlice=createSlice({
    name:'userAdmin',
    initialState:{
            isLoading:null,
            error:null,
            isAuthenticated:false,
            isUpdated:false,
            isDeleted:false,
            message:null,
            success:null,
            users:[],
            fetchUserForAdmin:{},
    },
    reducers:{
        START_LOADING(state,action){
            state.isLoading=true;
        },
        END_LOADING(state,action){
            state.isLoading=false;
        },
        FETCH_ADMIN_USERS(state,action){
            state.users=action.payload;

        },
        FETCH_ADMIN_USERS_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },     
        FETCH_ADMIN_USER(state,action){
            state.user=action.payload;
        },
        FETCH_ADMIN_USER_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        }, 
        UPDATE_ADMIN_USER_ERROR(state,action){
            state.error=action.payload; 
            state.isLoading=false; 
        },
        UPDATE_ADMIN_USER(state,action){
            state.isUpdated=action.payload;
        },
        DELETE_ADMIN_USER(state,action){
          
            console.log(action.payload);
            state.isDeleted=action.payload.success;
            state.message="User deleted successfully";
        },
        DELETE_ADMIN_USER_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
            
        },  
        UPDATE_ADMIN_USER_RESET(state,action){
            state.isUpdated=false;
        },
        DELETE_ADMIN_USER_RESET(state,action){
            state.isDeleted=false;
            state.message=null;
        },       
        CLEAR_ERRORS(state){
            state.error=null;  
        },
    }

});

export const userAdminActions=userAdminSlice.actions;
export default userAdminSlice;