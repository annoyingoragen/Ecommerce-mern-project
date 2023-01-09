import { Link } from "react-router-dom";
// import ReactStars from 'react-rating-stars-component';
import { Rating } from "@mui/material";
const ProductCard=({product})=>{
    const options={
        value:product.avgRating,
        precision:0.5,
        readOnly:true
    }
    // console.log(product)
    return(
        <div>
             <Link to={`/product/${product._id}`} className="productCard">
                {(product.images[0]) && (
                <img src={product.images[0].url} alt={product.name} />)}

                <p>{product.name}</p>
                    <div>
                    <Rating {...options} /> <span className="productCardSpan"> ({product.numOfReviews} Reviews)</span>
                    </div>
                    <span>${product.price}</span>


             </Link>
        </div>
    )
}

export default ProductCard;