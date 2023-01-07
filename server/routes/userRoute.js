const  Express  =require( "express");
const { deleteUser, forgotPassword, getAllUsers, getSingleUser, getUser, loginUser, logout, registerUser, resetPassword, updateUserPassword, updateUserProfile, updateUserRole } =require( "../controllers/userController.js");
const auth=require( '../middleware/auth.js');

const { authorizedRoles } =require( '../middleware/auth.js');

const router=Express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.post('/password/forgot',forgotPassword);
router.put('/password/reset/:token',resetPassword);
router.put('/password/update',auth,updateUserPassword);
router.put('/me/update',auth,updateUserProfile);
router.get('/me',auth,getUser);


router.get("/users/",auth,authorizedRoles("admin"),getAllUsers);
router.get("/user/:id",auth,authorizedRoles("admin"),getSingleUser);
router.put ("/user/:id",auth,authorizedRoles("admin"),updateUserRole);
router.delete("/user/:id",auth,authorizedRoles("admin"),deleteUser);




module.exports=router;