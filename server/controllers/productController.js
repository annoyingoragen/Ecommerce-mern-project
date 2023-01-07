// import path from 'path';
import productModel from "../models/productModel.js";
import ApiFeatures from "../utils/apifeatures.js";
// create product -- admin
import cloudinary from 'cloudinary';


export const createProduct=async(req,res)=>{

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
    try { 
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                    });
            
                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }
  
                req.body.images = imagesLinks;

                req.body.user=req.user.id;
                const product=req.body;
                
                const newProduct=await productModel.create(product);
                console.log(`newProduct ${newProduct}`);
            
                    await newProduct.save();
                    res.status(201).json({
                        success:true,
                        newProduct});
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
    
}

// get all products
export const getAllProducts =  async (req, res) => {
    const resultPerPage=8;
    const productCount=await productModel.countDocuments();
    const apiFeature=new ApiFeatures(productModel.find(),req.query).search().filter();

    let products = await apiFeature.query;
    let filteredProductCount = products.length;
    apiFeature.pagination (resultPerPage);
    products = await apiFeature.query.clone();
        
    // console.log(products);
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductCount,
    });
}



export const getAdminProducts =  async(req, res, next) => {
    const products = await productModel.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  }

//update product
export const updateProduct=async(req,res)=>{
  
    const { id } = req.params;
    const oldProduct= await productModel.findById(id);
    if (!oldProduct) {
        return res.status(500).json({
        success:false,
        message:'Product not found'});
        }

    try {
            let images = [];

            if (typeof req.body.images === "string") {
            images.push(req.body.images);
            } else {
            images = req.body.images;
            }
        
            if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < oldProduct.images.length; i++) {
                await cloudinary.v2.uploader.destroy(oldProduct.images[i].public_id);
            }
        
            const imagesLinks = [];
        
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
                });
        
                imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
                });
            }
        
            req.body.images = imagesLinks;
            }

            const product = req.body;
            console.log(product);

            const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
            console.log(updatedProduct)
            res.status(201).json({
                success:true,
                updatedProduct
            });
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const deleteProduct=async(req,res)=>{
    const { id } = req.params
    const oldProduct= await productModel.findById(id);
    if (!oldProduct) {
        return res.status(500).json({
        success:false,
        message:'Product not found'});
        }

    try {
        await productModel.findByIdAndRemove(id);
        res.status(201).json({
            success:true,
            message: "Product deleted successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const getProduct=async(req,res)=>{
    const { id } = req.params
    const product= await productModel.findById(id);
    if (!product) {
        return res.status(500).json({
        success:false,
        message:'Product not found'});
        }

    res.status(200).json({
            success:true,
            product });
    
}



export const createProductReview=async(req,res)=>{
    console.log(req.body);
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(req.body.rating),
        comment:req.body.comment,
        productId:req.body.id,
    };


    
    const product= await productModel.findById(req.body.id);
    const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                
            rev.rating=Number(req.body.rating);
            rev.comment=req.body.comment;
            }

        });

        }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }

    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    });
    product.avgRating=avg/product.reviews.length;
    
    await product.save({validateBeforeSave:false});
    res.status(200).json({
            success:true,
            product });
    
}



export const getProductReviews=async(req,res)=>{
    console.log('s');
    console.log((`req.query.productId ${req.query.productId}`))
     const product=await productModel.findById(req.query.productId);
     console.log(`product for review ${product}`)
     if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        });
     }

    res.status(200).json({
        success:true,
        reviews:product.reviews
         });
}




export const deleteReview=async(req,res)=>{
   try {
            const product=await productModel.findById(req.query.productId);
            if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
            }
            
            const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());

            let avg=0;
            reviews.forEach(rev=>{
                avg+=rev.rating
            });
            let avgRating = 0;

            if (reviews.length === 0) {
                avgRating = 0;
            } else {
                avgRating = avg / reviews.length;
            }

            const numOfReviews=reviews.length;

            await productModel.findByIdAndUpdate(req.query.productId,{
                reviews,
                avgRating,
                numOfReviews
            },{
                new:true,
                runValidators:true,
            });

            res.status(200).json({
            success:true,
            product
            });
   } catch (error) {
    console.log(error);
    return res.status(404).json({
        success:false,
        message:error.message
    });
    
   }
   

}



