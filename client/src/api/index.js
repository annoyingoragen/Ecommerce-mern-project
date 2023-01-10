import axios from  'axios';

const API=axios.create({baseURL:'https://us-central1-ecommerce-mern-project-backend.cloudfunctions.net/app' ,withCredentials: true,});


// const API=axios.create({baseURL:'http://localhost:5000/' ,withCredentials: true,});
API.interceptors.request.use((req)=>{
    // console.log(req);
    
    return req;
});

const config = { headers: { "Content-Type": "application/json" } };

export const fetchProducts=(keyword,currentPage,price,ratings)=> API.get(`/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&avgRating[gte]=${ratings}`);

export const fetchProduct=(id)=> API.get(`/products/${id}`);

export const fetchProductswithcategory=(keyword,currentPage,price,category,ratings)=> API.get(`/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}&category=${category}&avgRating[gte]=${ratings}`);




export const fetchAdminProducts=()=>API.get('products/admin/products');
export const addAdminProduct=(productData)=>API.post('/products/new',productData);
export const deleteAdminProduct=(id)=>API.delete(`/products/${id}`);
export const updateAdminProduct=(id,productData)=>API.patch(`/products/${id}`,productData);

export const fetchAdminOrders=()=>API.get('order/allorders');
export const deleteAdminOrder=(id)=>API.delete(`/order/${id}`);
export const updateAdminOrder=(id,orderData)=>API.put(`/order/${id}`,orderData);


export const fetchAdminUsers=()=>API.get('/users');
export const fetchAdminUser=(id)=>API.get(`/user/${id}`);
export const deleteAdminUser=(id)=>API.delete(`/user/${id}`);
export const updateAdminUser=(id,userData)=>API.put(`/user/${id}`,userData);


export const fetchAdminReviews=(id)=>API.get(`/products/reviews?productId=${id}`);
export const deleteAdminReview=(reviewId,productId)=>API.delete(`/products/reviews?id=${reviewId}&productId=${productId}`);


export const login=(formData)=>API.post('/login',formData,config);

export const register=(formData)=>API.post('/register',formData,config);
export const loadUser=()=>API.get('/me');
export const logout=()=>API.get('/logout');
export const updateProfile=(formData)=>API.put('/me/update',formData);
export const updatePassword=(passwords)=>API.put('/password/update',passwords,config);
export const forgotPassword=(email)=>API.post('/password/forgot',email,config);

export const resetPassword=(token,passwords)=>API.put(`/password/reset/${token}`,passwords ,config);

export const gettingStripeApiKey=()=>API.get('/stripeapikey');
export const paymentProcess=(paymentData)=>API.post('/payment/process',paymentData,
{
     headers: {
         "Content-Type": "application/json", 
         Authorization: `Bearer pk_test_51MErSySCeuzYa3kc5GDyNGRelOel1GHZ1eMoh5yyTzsmoytrEyzhrlbSpEdDiokBQcIh0S88Z216KvyNG3381Htw00U7hq58nF`       }
    

});


export const createOrder=(order)=>API.post('/order/new',order,config);
export const myOrders=()=>API.get('order/myorders',config);
export const getOrderDetails=(id)=>API.get(`order/${id}`,config);


export const newReview=(reviewData)=>API.put(`/products/review`,reviewData,config);