/* eslint-disable require-jsdoc */
// const path =require( 'path';
const orderModel =require( "../models/orderModel.js");
const productModel =require( "../models/productModel.js");
// const ApiFeatures =require( "../utils/apifeatures.js";

// create product -- admin
exports.newOrder=async (req, res)=>{
  const order=req.body;
  console.log(order);

  const newOrder=await orderModel.create({...order,
    user: req.user._id, paidAt: Date.now()});
  // console.log(newOrder);
  try {
    res.status(201).json({
      success: true,
      newOrder});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

// get all orders -admin
exports.getAllOrders = async (req, res) => {
  const orders=await orderModel.find();
  let totalAmount=0;

  orders.forEach((order)=>{
    totalAmount+=order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};


// update product
exports.updateOrder=async (req, res)=>{
  const product = req.body;
  console.log(req.body);
  const {id} = req.params;
  const order= await orderModel.findById(id);
  if (order.orderStatus==="Delivered") {
    return res.status(400).json({
      success: false,
      message: "You have already delivered this order"});
  }
  try {
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }


    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave: false});
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};


const updateStock=async (id, quantity) =>{
  const product=await productModel.findById(id);
  product.Stock-=quantity;
  await product.save({validateBeforeSave: false});
};

exports.deleteOrder=async (req, res)=>{
  const {id} = req.params;
  const order= await orderModel.findById(id);
  if (!order) {
    return res.status(500).json({
      success: false,
      message: "order not found"});
  }

  try {
    await order.remove();
    res.status(200).json({
      success: true,
      message: "Order deleted successfully"});
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};


exports.getOrder=async (req, res)=>{
  const {id} = req.params;
  const order= await orderModel.findById(id).populate("user", "name email");
  if (!order) {
    return res.status(500).json({
      success: false,
      message: "Order not found"});
  }

  res.status(200).json({
    success: true,
    order});
};


exports.getOrdersOfLoggedInUser=async (req, res)=>{
  const user = req.user._id;
  console.log(req.user._id);
  console.log(user);
  const orders= await orderModel.find({user: user});
  console.log(orders);
  res.status(200).json({
    success: true,
    orders});
};


// exports.createProductReview=async (req, res)=>{
//   const review={
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(req.body.rating),
//     comment: req.body.comment,
//     productId: req.body.productId,
//   };


//   const product= await productModel.findById(req.body.productId);
//   const isReviewed=product.reviews.find((rev)=>
//     rev.user.toString()===req.user._id.toString());
//   if (isReviewed) {
//     product.reviews.forEach((rev)=>{
//       if (rev.user.toString()===req.user._id.toString()) {
//         rev.rating=Number(req.body.rating);
//         rev.comment=req.body.comment;
//       }
//     });
//   } else {
//     product.reviews.push(review);
//     product.numOfReviews=product.reviews.length;
//   }

//   let avg=0;
//   product.reviews.forEach((rev)=>{
//     avg+=rev.rating;
//   });
//   product.avgRating=avg/product.reviews.length;

//   await product.save({validateBeforeSave: false});
//   res.status(200).json({
//     success: true,
//     product});
// };


exports.getProductReviews=async (req, res)=>{
  console.log("s");
  console.log((req.query.productId));
  const product=await productModel.findById(req.query.productId);
  console.log(product);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// exports.deleteReview=async (req, res)=>{
//   const product=await productModel.findById(req.query.productId);
//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   const reviews=product.reviews.filter((rev)=>
//     rev._id.toString()!==req.query.id.toString());

//   let avg=0;
//   reviews.forEach((rev)=>{
//     avg+=rev.rating;
//   });
//   const avgRating=avg/reviews.length;

//   const numOfReviews=reviews.length;

//   await productModel.findByIdAndUpdate(req.query.productId, {
//     reviews,
//     avgRating,
//     numOfReviews,
//   }, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//     product,
//   });
// };

