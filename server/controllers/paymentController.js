const { asyncErrorHandler } = require("../middleware/asyncErrorHandler");


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


module.exports.processPayment = asyncErrorHandler(async (req,res,next)=>{

    const payment = await stripe.paymentIntents.create({

        amount : req.body.amount ,
        currency : "inr",
        metadata :{
            company : "EasyMart"
        }
    })

    res.status(200).json({success : true , client_secret : payment.client_secret})

})


module.exports.getStripeApiKey = asyncErrorHandler((req,res,next)=>{

    // console.log(req.user)
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });

})