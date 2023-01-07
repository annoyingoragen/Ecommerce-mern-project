const  Express  =require( "express");
const { deleteOrder, getAllOrders, getOrder, getOrdersOfLoggedInUser, newOrder, updateOrder } =require( "../controllers/orderController.js");


const auth=require( "../middleware/auth.js");
const{ authorizedRoles } =require( "../middleware/auth.js");
const router=Express.Router();

router.get('/myorders',auth,getOrdersOfLoggedInUser);
router.post('/new',auth,newOrder);
router.get('/myorders',auth,getOrdersOfLoggedInUser);
router.get('/allorders',auth,authorizedRoles("admin"),getAllOrders);
router.get('/:id',auth,getOrder);

router.put('/:id',auth,authorizedRoles("admin"),updateOrder);


router.delete('/:id',auth,authorizedRoles("admin"),deleteOrder);


module.exports=router;