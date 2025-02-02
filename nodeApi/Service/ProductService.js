const productMaster = require("../Models/ProductModel");
const categoryMaster = require("../Models/CategoryModel");
const paginationService = require("../Service/PaginationService");

module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    Delete
}
async function GetAll(req, res) {
    console.log(req.query);
    queryParams = req.query;
    var data = await paginationService.getRercord(productMaster, queryParams)
    return data
}
async function GetById(req, res) {
    let id = req.params.id
    const record = await productMaster.find({ _id: id });
    return record
}
async function Create(req, res) {
    var data = req.body;
    var response;
    let isFind = await productMaster.find({ "productName": { $regex: new RegExp("^" + data.productName + "$", "i") } })
    let code = "P00";
    let increment = 1;
    console.log(isFind);
    if (isFind.length !== 0) {
        response = "Record already Exist";
    }
    else {
        let lastCode = await productMaster.find().limit(1).sort({ $natural: -1 })
        if (lastCode.length !== 0) {
            let stringValue = lastCode[0].productId.split('P00')
            let incrementValue = parseInt(stringValue[1]) + increment
            code = 'P00' + incrementValue
        }
        else {
            code = code + increment
        }
        let isCategory = await categoryMaster.find({ "categoryId": data.categoryId });
        data.categoryName = isCategory && isCategory[0].categoryName
        data.productId = code;
        response = new productMaster(data).save();
        console.log(response)
    }
    return response;
}
async function Update(req, res) {
    let id = req.params.id
    let data = req.body;
    let isCategory = await categoryMaster.find({ "categoryId": data.categoryId });
    data.categoryName = isCategory && isCategory[0].categoryName
    var update = await productMaster.findByIdAndUpdate({ _id: id }, data, { new: true })
    console.log(update)
    return update
}
async function Delete(req, res) {
    let id = req.params.id
    var remove = await productMaster.findOneAndDelete({ _id: id });
    console.log(remove)
    return remove
}