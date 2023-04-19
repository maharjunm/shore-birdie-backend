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

paymentSchema.statics.isProductTaken = async function (email) {
  const payment = await this.findOne({'email':email,'status':true});
  return !!payment;
};
paymentSchema.statics.isRegularTaken = async function (email) {
  const payment = await this.findOne({'email':email});
  return payment && payment.regularPayment;
};
paymentSchema.statics.getPayments = async function(){
  const payments = await this.find();
  return payments;
}
paymentSchema.statics.getPaymentStatus = async function(email){
  const record = await this.findOne({'email':email});
  return record;
}
paymentSchema.statics.updatePaymentStatus = async function(email){
  const updated = await this.updateOne(
    {
      'email': email,
      'status': true,
      'expiryDate': { $lt: Date.now() }
    },
    {
      $set :{
        'status':false,
      }
    }
  );
  return updated;
}
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
