import userModel from "../models/userModel.js";
import sendToken from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import cloudinary from 'cloudinary';



export const registerUser=async(req,res)=>{
   try {
    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })
    const {name,email,password}=req.body;
    const user=await userModel.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });
    sendToken(user,201,res);
    
   } catch (error) {
    console.log(error);
        return res.status(400).json({
            success:false,
            message:error
        });
   } 
}


export const loginUser=async(req,res)=>{
    console.log("loggin in");
    console.log(req.body);
    const {loginEmail,loginPassword}=req.body;

    if(!loginEmail||!loginPassword){
        return res.status(400).json({
            success:false,
            message:'Please enter both email & password'});
    }
    console.log("hrtr")
    const user=await userModel.findOne({email:loginEmail}).select("+password");
    console.log(`logged user: ${user}`);
    if(!user){ 
        console.log("j");
         res.status(401).json({
            success:false,
            message:'Invalid Emial or Password'});
            return;

    }
    const isPasswordMatched=await user.comparePassword(loginPassword);
    console.log(`is pass match ${isPasswordMatched}`)
    if(!isPasswordMatched){ 
        return res.status(401).json({
            success:false,
            message:'Invalid  Password'});

    }
    sendToken(user,200,res);

}



export const logout=async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
}

export const forgotPassword=async(req,res)=>{
    const user=await userModel.findOne({email:req.body.email});

    if(!user){ 
        return res.status(404).json({
            success:false,
            message:'user not found'});

    }

    const resetToken=user.getPasswordResetToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    // const resetPasswordUrl=`${req.protocol}://${req.get(
    //     "host"
    //   )}/password/reset/${resetToken}`;
    const message=`Your password rest token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it. `;

    try {
        
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully.`});

    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return res.status(500).json({
            success:false,
            message:error.message});
        
    }
}



export const resetPassword=async(req,res)=>{
    const resetPasswordToken=crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");

   try{      
       const user=await userModel.findOne({
                resetPasswordToken,
                resetPasswordExpire:{$gt:Date.now()},
            });

            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"Reset password token is invalid or has been expired"
                });
            }

            if(req.body.password!==req.body.confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Password does not match"
                });
            }

            user.password=req.body.password;
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;

            await user.save();

    sendToken(user,200,res);}
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error
        });
    }


}




export const getUser=async(req,res)=>{
    // const { id } = req.params
    const user= await userModel.findById(req.user.id);
    

    res.status(200).json({
        success:true,
        user,
    }
            
             );
    
}

export const updateUserPassword=async(req,res)=>{
    // const { id } = req.params
        try{            const user= await userModel.findById(req.user.id).select("+password");
                    
                    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

                    if(!isPasswordMatched){
                        return res.status(400).json({
                            success:false,
                            message:"old password is incorrect"
                        });
                    }
                    console.log(`password 1 ${req.body.password}`);
                    console.log(`password 1 ${req.body.confirmPassword}`);
                    if(req.body.password!==req.body.confirmPassword){
                        return res.status(400).json({
                            success:false,
                            message:"Password does not match"
                        });
                    }

                    user.password=req.body.password;

                    await user.save()

                    sendToken(user,200,res);
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:error.message
            });
        }
    
}


export const updateUserProfile=async(req,res)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    };
    console.log(req.body);
   try{ 
   
            if(req.body.avatar!=="" &&req.body.avatar!=="undefined"&&req.body.avatar!==undefined){
                const user=await userModel.findById(req.user.id);
                console.log(user.avatar);
                const imageId=user.avatar.public_id;
                await cloudinary.v2.uploader.destroy(imageId);
                console.log(imageId);
                const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
                    folder:"avatars",
                    width:150,
                    timeout:120000,
                    crop:"scale",
                });
                newUserData.avatar={
                    public_id:myCloud.public_id,
                    url:myCloud.secure_url
                }
            }
            console.log(newUserData);

            const user=await userModel.findByIdAndUpdate(req.user.id,newUserData,{
                new:true,
                runValidators:true,
            });

            
                res.status(200).json({
                    success:true,
                });
  }catch(error)
  {
    console.log(error);
    return res.status(400).json({
        success:false,
        message:error.message
    });
  }

    
}



export const getAllUsers=async(req,res)=>{
  
    const users=await userModel.find();
    
         res.status(200).json({
            success:true,
            users
        });    
}


export const getSingleUser=async(req,res)=>{
    // const { id } = req.params
    const user= await userModel.findById(req.params.id);

    if(!user){
        return    res.status(500).json({
            success:false,
            message:`user does not exist with: ${req.params.id}` });
    }
    

    res.status(200).json({
            success:true,
            user });
    
}


export const updateUserRole=async(req,res)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };
    try {
        const user=await userModel.findByIdAndUpdate(req.params.id,newUserData,{
            new:true,
            runValidators:true,
        });
    
        
             res.status(200).json({
                success:true,
                user
            });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:error.message
        });

    }
   
  

    
}


export const deleteUser=async(req,res)=>{
   
    const user=await userModel.findById(req.params.id);
    if(!user){
        return    res.status(500).json({
            success:false,
            message:`user does not exist with: ${req.params.id}` });
    }
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
  
    
    await user.remove();
         res.status(200).json({
            success:true,
        });
  

    
}
