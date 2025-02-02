const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryMaster = new Schema({
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true }
})
module.exports = mongoose.model("categoryMaster", CategoryMaster, "categoryMaster")