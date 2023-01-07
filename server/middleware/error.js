import ErrorHandler from "../utils/errorhandler";


const errHandler= (err,res,req)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error";

    res.status(err.statusCode).json({
            success:false,
            error:err,
        }
    );

}

export default errHandler;