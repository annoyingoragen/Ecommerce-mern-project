import * as api from '../api/index';
import { reviewActions } from "../reducers/reviewReducer";

export const newReview=(reviewData)=>async(dispatch)=>{

    const sendRequest=async(reviewData)=>{
        console.log(reviewData)
        const {data}=await api.newReview(reviewData);
        return data;
    }
    try {
        dispatch(reviewActions.START_LOADING());
        const data=await sendRequest(reviewData);
        console.log(data);
        dispatch(reviewActions.NEW_REVIEW(data.success));
        dispatch(reviewActions.END_LOADING());
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(reviewActions.NEW_REVIEW_ERROR(error.response.data.message))
    }
}


export const clearErrors=()=> async (dispatch)=>{
    dispatch(reviewActions.CLEAR_ERRORS());
}



export const fetchAdminReviews=(id)=> async (dispatch)=>{
    
    const sendRequest=async (id)=>{
        console.log(id);
        const {data}=await api.fetchAdminReviews(id);
        return data.reviews;
    }
        try{
            dispatch(reviewActions.START_LOADING());
            const reviews=await sendRequest(id);
            console.log(reviews);  

            dispatch(reviewActions.FETCH_ADMIN_REVIEWS(reviews));
            dispatch(reviewActions.END_LOADING());
        }
        catch(error)
        {
            console.log(error.response.data.message);
            dispatch(reviewActions.FETCH_ADMIN_REVIEWS_ERROR(error.response.data.message));

        }
}


export const deleteAdminReview=(reviewId,productId)=>async(dispatch)=>{
    const sendRequest=async(reviewId,productId)=>{
        const {data}=await api.deleteAdminReview(reviewId,productId);
        return data;
    };
    try {
        dispatch(reviewActions.START_LOADING());
        const data=await sendRequest(reviewId,productId);
        console.log(data);
        dispatch(reviewActions.DELETE_ADMIN_REVIEW(data));
        dispatch(reviewActions.END_LOADING());
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(reviewActions.DELETE_ADMIN_REVIEW_ERROR(error.response.data.message));
    }  
}
