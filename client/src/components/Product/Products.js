import { Fragment, useEffect, useState } from 'react';
import './productsStyles.css';
import {useSelector,useDispatch} from 'react-redux';
import { clearErrors, getProducts } from "../../actions/productAction";
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import ProductCard from '../Home/ProductCard';
import MetaData from '../layout/MetaData';
import Pagination from 'react-js-pagination';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  
const Products=()=>{
    const dispatch=useDispatch();
    const {keyword}=useParams();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);
    
    const {
        products,
        isLoading,
        error,
        productCount,
        resultPerPage,
        filteredProductCount
    }=useSelector((state)=>state.products);
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice);
    }
    useEffect(()=>{
        if(error){
             alert.error(error);  
              dispatch(clearErrors()) 
           }
           console.log(ratings);
        dispatch(getProducts(keyword,currentPage,price,category,ratings));
    },[dispatch,alert,error,keyword,currentPage,price,category,ratings]);
    // console.log(product);
    return(
        <Fragment>
             {isLoading ? (
                <Loader/>
             ):(
                <Fragment>
                     <MetaData title="PRODUCTS -- ECOMMERCE" />
                     
                     <h2 className="productsHeading">Products</h2>

                     <div className="products">
                            {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                     </div>
                     <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                        />

                        <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                        <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                        >
                                        {category}
                                        </li>
                                    ))}
                            </ul>

                        <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                    setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                        </fieldset>



                    </div>
                       {resultPerPage < filteredProductCount && (
                            <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={filteredProductCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                            </div>
                        )}

                </Fragment>
                )}
         </Fragment>    
    )
}


export default Products;