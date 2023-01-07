const sendToken=(user,statusCode,res)=>{

    const token=user.getJWTToken();

    console.log(`succesfully logged in ${token}`);
    console.log(typeof(token));
    //options for cookie

    const options={
        expires:new Date(
            Date.now()+1*24*60*60*1000
        ),
        sameSite : "none",
        secure: true,
        // domain: "https://ecommerce-mern-project-9996b.web.app",
        // httpOnly: true
    }




    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });

}


module.exports= sendToken;