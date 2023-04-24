const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const paymentSchema = mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    payment_intent: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: true,
    },
    productId: {
      type:String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      sparse:true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    address:{
      city:        { type: String },
      country:     { type: String },
      line1:       { type: String },
      line2:       { type: String },
      postal_code: { type: Number },
      state:       { type: String },
    },
  },
  {
    timestamps: true,
  }   
);
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

paymentSchema.statics.getPayments = async function(){
  const payments = await this.find();
  return payments;
}
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
