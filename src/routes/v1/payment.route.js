const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const bodyparser = require('body-parser')
const cors = require('cors');
const stripe = require("stripe")("sk_test_51MUr0rSCXoMBK86oijlwSA5ws6Pk8fNWGhTSHG6VOfRaM01Mk7yC7I7MeUunfTY4u1TvyL4lrkspamPKIImPvmp800Ma3ybMd0")
const uuid = require("uuid").v4
const router = express.Router();

  router
    .route('/checkout')
    .post((req,res)=>{
      console.log("Request:", req.body);
      let error, status
      try{
        const {product,token} = req.body
         const customer = stripe.customers.create({
          email: token.email,
          source:token.id
        })
        const key = uuid()
       const charge = stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "eur",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          {
            key,
          }
        );
        console.log("Charge:",{charge});
        status = "success";
      }
      catch(error){
        console.log(error)
        status = "failure";
      }
      res.json({error,status});
    })
module.exports = router;