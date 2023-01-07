import Stripe from 'stripe';

// const stripe=new Stripe("sk_test_51MErSySCeuzYa3kcDJEcEzbPKzzey44NW618CbNhi72CR3yaBHEYGOEQThjrAXpgZvUvbd0zoOSONlTILCmIJtUs00zzIU2g67")

export const processPayment=async(req,res,next)=>{
    // console.log(Stripe)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    console.log(req.body.amount)
    try{
         const myPayment=await stripe.paymentIntents.create({
                amount: req.body.amount ,
                currency: "usd",
                description:"cart",
                metadata:{
                    company:"Your cart"
                }
            });

            res.status(200).json({
            success:true,
            client_secret:myPayment.client_secret
            });
    }
    catch(error){
        res.status(401).json({
            success:false,
            message:error.message
            });
    }
}


export const sendstripeApiKey = async (req, res, next) => {
    res.status (200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
}