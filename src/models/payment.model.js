const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const paymentSchema = mongoose.Schema(
  {
    expiryDate:{
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    regularPayment:{
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index:true,
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
    product: {
      type: {
        type: String,
        required: true,
        trim: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      hostingTime:{
        type: Number,
      },
      offers: [{
        field:{
          type: String,
          required: true,
          trim : true,
        },
        value: {
          type: Boolean,
          required: true,
        }
      }],
    }
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
