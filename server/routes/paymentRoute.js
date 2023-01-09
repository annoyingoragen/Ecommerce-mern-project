const Express =require( "express");
const {processPayment,
  sendstripeApiKey} =require( "../controllers/paymentController.js");

const {auth}=require( "../middleware/auth.js");
// const {authorizedRoles} =require( "../middleware/auth.js");
// eslint-disable-next-line new-cap
const router=Express.Router();


router.route("/payment/process").post( auth, processPayment);
router.route("/stripeapikey").get( auth, sendstripeApiKey);

module.exports=router;
