import { createSlice } from "@reduxjs/toolkit";

const reviewSlice=createSlice({
    name:"reviews",
    initialState:{
            isLoading:null,
            error:null,
            reviews:[],
            isDeleted:false,
            message:null,

    },
    reducers:{
        START_LOADING(state,action){
            state.isLoading=true;
        },
        END_LOADING(state,action){
            state.isLoading=false;
        },
        NEW_REVIEW(state,action){
            state.success=action.payload;
        },
        NEW_REVIEW_ERROR(state,action){
            state.isLoading=false; 
            state.error=action.payload;
        },
        NEW_REVIEW_RESET(state,action){
            state.success=false;
        },
        FETCH_ADMIN_REVIEWS(state,action){
            state.reviews=action.payload;

        },
        FETCH_ADMIN_REVIEWS_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },
        DELETE_ADMIN_REVIEW(state,action){
          
            console.log(action.payload);
            state.isDeleted=action.payload.success;
            state.message="Review deleted successfully";
        },
        DELETE_ADMIN_REVIEW_ERROR(state,action){
            state.error=action.payload;
            state.isLoading=false;
        },  
        DELETE_ADMIN_REVIEW_RESET(state,action){
            state.isDeleted=false;
            state.message=null;
        }, 
        CLEAR_ERRORS(state){
            state.error=null;  
        },

    }
});

export const reviewActions=reviewSlice.actions;
export default reviewSlice;