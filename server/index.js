const express =require( "express");
const cors =require( "cors");
const productRoutes =require( "./routes/productRoute.js");
const userRoutes =require( "./routes/userRoute.js");
const orderRoutes =require( "./routes/orderRoute.js");
const paymentRoutes =require( "./routes/paymentRoute.js");
const dotenv =require( "dotenv");
const bodyParser =require( "body-parser");
const mongoose =require( "mongoose");
const cookieParser =require( "cookie-parser");
const cloudinary =require( "cloudinary");
const fileUpload =require( "express-fileupload");




const app=express();
dotenv.config();

app.use(bodyParser.json({limit:'50mb',extended:true}));

app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(fileUpload());



const PORT=process.env.PORT ||5000;
app.get('/',(req,res)=>{
  res.send('APP IS RUNNING');
})
app.use('/products',productRoutes);
app.use('/',userRoutes);
app.use('/order',orderRoutes);
app.use('/',paymentRoutes);


// app.use(express.static(path.join(__dirname,"../client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname ,"../client/build/index.html"));
//   });

// app.use(errHandler);




mongoose.connect(process.env.CONNECTION_URL,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
 
})
.then(()=>app.listen(PORT,()=>{console.log(`server running ${PORT}`)}))
.catch((error)=>console.log(`main error ${error.message}`));

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

// process.on("unhandledRejection",err=>{
//   console.log(`Error: ${err.message}`);
// })