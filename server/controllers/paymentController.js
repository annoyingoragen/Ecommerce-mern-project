const Stripe =require( "stripe");

exports.processPayment=async (req, res, next)=>{
  // console.log(Stripe)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log(req.body.amount);
  try {
    const myPayment=await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      description: "cart",
      metadata: {
        company: "Your cart",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


exports.sendstripeApiKey = async (req, res, next) => {
  res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
};
