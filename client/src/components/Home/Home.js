import { Fragment, useEffect } from "react"
import {BsMouse} from 'react-icons/bs';
import "./homeStyles.css"
import ProductCard from './ProductCard';
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productAction";
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
const Home=()=>{
    const {products,isLoading,error,productCount}=useSelector((state)=>state.products);
    const alert = useAlert()
    const dispatch=useDispatch();
    useEffect(()=>{
        if(error){
          alert.error(error);  
           dispatch(clearErrors()) 
        }
        dispatch(getProducts());
    },[dispatch,error,alert]);
    
    return (
        <Fragment>
            <div className="banner">
                    <p>Welcome to YOUR CART</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>
                    <a href="#conatiner">
                        <button>
                            Scroll <BsMouse />
                                                    
                        </button>
                    </a>
                </div>
            {isLoading ? (
            <Loader/>
        ):(
            <Fragment>
                <MetaData title="Your Cart"/>
                
                <h2 className="homeHeading">Featured Products</h2>

                <div className="container" id="conatiner">
                    {productCount>0 && products.map((product)=> <ProductCard key={product._id} product={product} /> )}
                
                
                </div>
            </Fragment>)}
        </Fragment>
    );
}

export default Home;