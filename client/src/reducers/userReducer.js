import { createSlice } from '@reduxjs/toolkit';


const userSlice=createSlice({
    name:'user',
    initialState:{
            user:{},
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
        REGISTER_LOGIN_LOAD(state,action){
            console.log('fetcing user');
            console.log(action.payload);
            state.isAuthenticated=true;
            state.user=action.payload;
            
        },
        REGISTER_LOGIN_LOAD_ERROR(state,action){
            state.error=action.payload; 
            state.isAuthenticated=false;
            state.isLoading=false;             
        },
        LOGOUT(state){
            state.user={};
            state.isAuthenticated=false;
        },
        RESET_PASSWORD_FORGOT_PASSWORD_UPDATE_PASSWORD_UPDATE_PROFILE_LOGOUT_ERROR(state,action){
            state.error=action.payload; 
            state.isLoading=false; 
        },
        UPDATE_PASSWORD_UPDATE_PROFILE(state,action){
            state.isUpdated=action.payload;
        },
        UPDATE_PROFILE_RESET(state,action){
            state.isUpdated=false;
        },
        FORGOT_PASSWORD(state,action){
            state.message=action.payload;
        },
        RESET_PASSWORD(state,action){
            state.success=action.payload;
        },
        // FETCH_ADMIN_USERS(state,action){
        //     state.users=action.payload;

        // },
        // FETCH_ADMIN_USERS_ERROR(state,action){
        //     state.error=action.payload;
        //     state.isLoading=false;
        // },     
        // FETCH_ADMIN_USER(state,action){
        //     state.fetchUserForAdmin=action.payload;
        // },
        // FETCH_ADMIN_USER_ERROR(state,action){
        //     state.error=action.payload;
        //     state.isLoading=false;
        // }, 
        // DELETE_ADMIN_USER(state,action){
        //     console.log('deleting produt');
        //     console.log(action.payload);
        //     state.isDeleted=action.payload.success;
        //     state.message=action.payload.message;
        // },
        // DELETE_ADMIN_USER_ERROR(state,action){
        //     state.error=action.payload;
        //     state.isLoading=false;
        // },
        // DELETE_ADMIN_USER_RESET(state,action){
        //     state.isDeleted=false;
        // },       
        CLEAR_ERRORS(state){
            state.error=null;  
        },
    }

});

export const userActions=userSlice.actions;
export default userSlice;