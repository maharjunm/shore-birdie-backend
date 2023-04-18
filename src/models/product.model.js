const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    type: {
      type:String,
      enum: ['Regular','Platinum','Diamond'],
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    hostingTime: {
      type: Number,
      required: true,
    },
    offers: [{
      field: {
        type: String,
        required: true,
      },
      value: {
        type: Boolean,
        required: true,
      } 
    }],
  }  
);

productSchema.statics.getProductById = async function (id) {
  const product = await this.findOne({'productId':id});
  return product;
};


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
