const  Express  =require( "express");
const { processPayment, sendstripeApiKey } =require( "../controllers/paymentController.js");

const auth=require( "../middleware/auth.js");
const { authorizedRoles } =require( "../middleware/auth.js");
const router=Express.Router();


router.post('/payment/process',auth,processPayment);
router.get("/stripeapikey",auth, sendstripeApiKey);

module.exports=router;