const Express =require( "express");
const {deleteUser, forgotPassword,
  getAllUsers, getSingleUser,
  getUser, loginUser, logout,
  registerUser, resetPassword,
  updateUserPassword, updateUserProfile,
  updateUserRole}=
      require( "../controllers/userController.js");
const {auth}=require( "../middleware/auth.js");

const {authorizedRoles} =require( "../middleware/auth.js");

// eslint-disable-next-line new-cap
const router=Express.Router();


router.route("/register").post( registerUser);
router.route("/login").post( loginUser);
router.route("/logout").get( logout);
router.route("/password/forgot").post( forgotPassword);
router.route("/password/reset/:token").put( resetPassword);
router.route("/password/update").put( auth, updateUserPassword);
router.route("/me/update").put( auth, updateUserProfile);
router.route("/me").get( auth, getUser);


router.route("/users/").get( auth, authorizedRoles("admin"), getAllUsers);
router.route("/user/:id").get( auth, authorizedRoles("admin"), getSingleUser);
router.route("/user/:id").put( auth, authorizedRoles("admin"), updateUserRole);
router.route("/user/:id").delete( auth, authorizedRoles("admin"), deleteUser);


module.exports=router;
