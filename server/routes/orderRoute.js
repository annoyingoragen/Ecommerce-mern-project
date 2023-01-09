const Express =require( "express");
const {deleteOrder, getAllOrders,
  getOrder, getOrdersOfLoggedInUser,
  newOrder, updateOrder} =require( "../controllers/orderController.js");


const {auth}=require( "../middleware/auth.js");
const {authorizedRoles} =require( "../middleware/auth.js");
// eslint-disable-next-line new-cap
const router=Express.Router();

router.route("/myorders").get( auth, getOrdersOfLoggedInUser);
router.route("/new").post( auth, newOrder);
router.route("/myorders").get( auth, getOrdersOfLoggedInUser);
router.route("/allorders").
    get( auth, authorizedRoles("admin"), getAllOrders);
router.route("/:id").get( auth, getOrder);

router.route("/:id").put( auth, authorizedRoles("admin"), updateOrder);


router.route("/:id").delete( auth, authorizedRoles("admin"), deleteOrder);


module.exports=router;
