import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetail from './components/Product/ProductDetail';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from "./components/layout/Header/UserOptions";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { gettingStripeApiKey } from './api';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UserList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewList from './components/Admin/ReviewList';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
import NotFound from './components/layout/NotFound/NotFound';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const [stripeApiKey, setStripeApiKey] = useState("");


  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });

    store.dispatch(loadUser());

    // getStripeApiKey();
  },[]);

  // async function getStripeApiKey() {
  //   const { data } = await gettingStripeApiKey();
  //   const final=await data;
  //   console.log(final);

  //   setStripeApiKey(data.stripeApiKey);
  // } 
  // console.log(user)
  const stripePromise = loadStripe("pk_test_51MErSySCeuzYa3kc5GDyNGRelOel1GHZ1eMoh5yyTzsmoytrEyzhrlbSpEdDiokBQcIh0S88Z216KvyNG3381Htw00U7hq58nF");
  return (
    <BrowserRouter>
    
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Elements stripe={stripePromise}>
      <Routes>
        
        <Route exact path="/"element={<Home/>} />
        <Route exact path="/about"element={<About/>} />
        <Route exact path="/contact"element={<Contact/>} />
        
        <Route exact path="/product/:id" element={<ProductDetail/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/products/:keyword" element={<Products/>} />
        <Route exact path="/search" element={<Search/>} />

        <Route exact path='/login' element={<LoginSignUp/>} />

        <Route element={<ProtectedRoute isAdmin={user.role==="admin"}/>}>
                <Route  path="/account" element={<Profile/>}  exact/>
                <Route  path='/me/update' element={<UpdateProfile/>} exact/>
                <Route  path='/password/update' element={<UpdatePassword/>} exact/>

                <Route  path='/shipping' element={<Shipping/>} exact/>
                <Route  path='/order/confirm' element={<ConfirmOrder/>} exact/>

                <Route  path='/process/payment' element={<Payment/>} exact/>

                <Route  path='/success' element={<OrderSuccess/>} exact/>
                <Route  path='/orders' element={<MyOrders/>} exact/>
                <Route  path='/order/:id' element={<OrderDetails/>} exact/>

                <Route  path='/admin/dashboard' element={<Dashboard/>} exact/>
                <Route  path='/admin/products' element={<ProductList/>} exact/>
                <Route  path='/admin/product' element={<NewProduct/>} exact/>
                <Route  path='/admin/product/:id' element={<UpdateProduct/>} exact/>
                <Route  path='/admin/orders' element={<OrderList/>} exact/>
                <Route  path='/admin/order/:id' element={<ProcessOrder/>} exact/>
                <Route  path='/admin/users' element={<UserList/>} exact/>
                <Route  path='/admin/user/:id' element={<UpdateUser/>} exact/>
                <Route  path='/admin/reviews' element={<ReviewList/>} exact/>
                                

        </Route>
      
        <Route  path='/password/forgot' element={<ForgotPassword/>}/>
        <Route  path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route  path='/cart' element={<Cart/>}/>  

        <Route path="*" element={<NotFound/>}/>

      </Routes>
      </Elements>

      <Footer/>
    </BrowserRouter> 
  );
}

export default App;
