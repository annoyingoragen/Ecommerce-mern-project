import jwt from'jsonwebtoken';
import userModel from '../models/userModel.js';

const auth=async(req,res,next)=>{
    try {
        console.log(req.cookies);
        const {token}=req.cookies;
        console.log(`token ${token}`);
        if(!token){
            return next( res.status(400).json({
                success:false,
                message:'Please Login to access this resource'}));
        }
        console.log("s")
        const decodedData=jwt.verify(token,"ECOM_KEY");
        req.user=await userModel.findById(decodedData.id);
        next();
        
    } catch (error) {
        console.log(`token finding error ${error}`);
    }
}
exports.authorizedRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(res.status(403).json({
                success:false,
                message:`Role: ${req.user.role} is not allowed to access this resource`}));
        }
        next();
    }
}
export default auth;