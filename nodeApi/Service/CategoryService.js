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
    queryParams = req.query;
    var data = await paginationService.getRercord(categoryMaster, queryParams);
    console.log(data);
    return data
}
async function GetById(req, res) {
    let id = req.params.id
    const record = await categoryMaster.find({ _id: id });
    return record
}
async function Create(req, res) {

    var data = req.body;
    console.log(new RegExp("^" + data.categoryName.toLowerCase(), "i"));
    var response;
    let isFind = await categoryMaster.find({ "categoryName": { $regex: new RegExp("^" + data.categoryName + "$", "i") } })
    let code = "C00";
    let increment = 1;
    console.log(isFind);
    if (isFind.length !== 0) {
        ``
        response = "Record already Exist";
    }
    else {
        let lastCode = await categoryMaster.find().limit(1).sort({ $natural: -1 })
        if (lastCode.length !== 0) {
            let stringValue = lastCode[0].categoryId.split('C00')
            let incrementValue = parseInt(stringValue[1]) + increment
            code = 'C00' + incrementValue
        }
        else {
            code = code + increment
        }
        data.categoryId = code;
        response = new categoryMaster(data).save();
        console.log(response)
    }
    return response;
}
async function Update(req, res) {
    let id = req.params.id
    var update = await categoryMaster.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    console.log(update)
    return update
}
async function Delete(req, res) {
    let id = req.params.id
    console.log(id);
    var remove = await categoryMaster.findByIdAndDelete({ _id: id });
    console.log(remove)
    return remove
}