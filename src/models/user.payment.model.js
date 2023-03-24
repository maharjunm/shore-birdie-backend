const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const userPaymentSchema = mongoose.Schema(
  {
    expiryDate:{
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
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
    product: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }  
);
userPaymentSchema.plugin(toJSON);
userPaymentSchema.plugin(paginate);
userPaymentSchema.statics.isProductTaken = async function (email) {
  const payment = await this.findOne({'email':email});
  console.log("matched",payment);
  return !!payment;
};

userPaymentSchema.statics.getPayments = async function(){
  const payments = await this.find();
  return payments;
}
userPaymentSchema.statics.getPaymentStatus = async function(email){
  const record = await this.findOne({'email':email});
  return record;
}
userPaymentSchema.statics.updatePaymentStatus = async function(email){
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
const UserPayment = mongoose.model('userPayment', userPaymentSchema);

module.exports = UserPayment;
