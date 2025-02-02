const ProductService = require("../Service/ProductService");
const express = require("express")
const router = express.Router()

router.get("/", GetAll)
router.get("/:id", GetById)
router.post("/", Create)
router.put("/:id", Update)
router.delete("/:id", Delete)

module.exports=router;

async function GetAll(req, res, next) {
    ProductService.GetAll(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function GetById(req, res, next) {
    ProductService.GetById(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function Create(req, res, next) {
    ProductService.Create(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function Update(req, res, next) {
    ProductService.Update(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function Delete(req, res, next) {
    ProductService.Delete(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}