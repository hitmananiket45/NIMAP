const CategoryService = require("../Service/CategoryService");
const express = require("express")
const router = express.Router()

router.get("/", GetAll)
router.get("/:id", GetById)
router.post("/", Create)
router.put("/:id", Update)
router.delete("/:id", Delete)

module.exports=router;

async function GetAll(req, res, next) {
    CategoryService.GetAll(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function GetById(req, res, next) {
    CategoryService.GetById(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function Create(req, res, next) {
    CategoryService.Create(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function Update(req, res, next) {
    CategoryService.Update(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}
async function Delete(req, res, next) {
    CategoryService.Delete(req)
        .then(data => res.json(data))
        .catch(err => next(err))
}