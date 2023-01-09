const Express =require( "express");
const {createProduct, createProductReview,
  deleteProduct, deleteReview,
  getAdminProducts, getAllProducts, getProduct,
  getProductReviews, updateProduct} =
  require( "../controllers/productController.js");
const {auth}=require( "../middleware/auth.js");
const {authorizedRoles} =require( "../middleware/auth.js");

// eslint-disable-next-line new-cap
const router=Express.Router();


router.route("/reviews").get( getProductReviews);
router.route("/reviews").delete( auth, deleteReview);
router.route("/admin/products").get( auth, authorizedRoles("admin"),
    getAdminProducts);
router.route("/").get(getAllProducts);
router.route("/:id").get( getProduct);
router.route("/new").post( auth, authorizedRoles("admin"), createProduct);
router.route("/:id").patch( auth, authorizedRoles("admin"), updateProduct);
router.route("/:id").delete( auth, authorizedRoles("admin"), deleteProduct);


router.route("/review").put( auth, createProductReview);


module.exports=router;
