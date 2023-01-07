const  Express  =require( "express");
const { createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllProducts,getProduct,getProductReviews,updateProduct } =require( "../controllers/productController.js");
const auth=require( "../middleware/auth.js");
const { authorizedRoles } =require( "../middleware/auth.js");

const router=Express.Router();


router.get('/reviews',getProductReviews);
router.delete('/reviews',auth,deleteReview);
router.get('/admin/products',auth,authorizedRoles("admin"),getAdminProducts);
router.get('/',getAllProducts);
router.get('/:id',getProduct);
router.post('/new',auth,authorizedRoles("admin"),createProduct);
router.patch('/:id',auth,authorizedRoles("admin"),updateProduct);
router.delete('/:id',auth,authorizedRoles("admin"),deleteProduct);



router.put('/review',auth,createProductReview);



module.exports=router;