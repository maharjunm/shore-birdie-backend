const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const paymentSchema = mongoose.Schema(
  { 
    token: {
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
      created: {
        type: Number,
        required: true,
      },
      id: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        require: true,
      },
      card: {
        id: {
          type: String,
          require: true,
        },
        name: {
          type: String,
          require: true,
          trim: true,
        },
        last4: {
          type: Number,
          required: true,
        },
        exp_month: {
          type: Number,
          required: true,
        },
        exp_year: {
          type: Number,
          required: true,
        },
        country:{
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        address_city:{
          type: String,
          required: true,
        },
        address_country: {
          type: String,
          required: true,
        },
        address_line1: {
          type: String,
          required: true,
        },
        address_state: {
          type: Number,
          required: true,
        },
        address_zip: {
          type: Number,
          required: true,
        }
      }
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
  const payment = await this.findOne({'token.email':email});
  return !!payment;
};

paymentSchema.statics.getPayments = async function(){
  const payments = await this.find();
  return payments;
}

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
