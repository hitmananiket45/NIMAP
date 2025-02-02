const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductMaster = new Schema({
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true }
})
module.exports = mongoose.model("productMaster", ProductMaster, "productMaster")