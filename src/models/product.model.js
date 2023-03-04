const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const productSchema = mongoose.Schema(
  { 
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }  
    
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
