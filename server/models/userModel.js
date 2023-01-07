import mongoose from "mongoose"; 
import validator from "validator";
import bcryptjs from "bcryptjs";
import jsonwebtoken  from "jsonwebtoken";
import crypto from 'crypto';
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"],
    },
    email:{
        type:String,
        required: [true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required: [true,"Please Enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        
            type:String,
            default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password=await bcryptjs.hash(this.password,10);
});


userSchema.methods.getJWTToken=function(){
    return jsonwebtoken.sign(
        {id:this._id},
        "ECOM_KEY",
        {expiresIn:"1d"}
    )
}


userSchema.methods.comparePassword=async function(enteredPassword){
    
    return await bcryptjs.compare(enteredPassword,this.password);
}


userSchema.methods.getPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}


export default mongoose.model("User",userSchema);