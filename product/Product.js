var mongoose = require('mongoose');  
var ProductSchema = new mongoose.Schema({  
  productName: String,
  productCategory: String,
  productDetail: String,
  productPrice: Number
});
mongoose.model('Product', ProductSchema);

module.exports = mongoose.model('Product');