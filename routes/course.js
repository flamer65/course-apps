const {Router} = require("express");
const {UserModel, AdminModel, CourseModel} = require("../db")
const {usermiddle} = require("../middelware/usermiddeleware")
const courseRouter = Router();

courseRouter.post('/purchase', (req, res) =>{
    res.send("sign end")
})


courseRouter.post('/preview', (req, res) =>{
    res.send("sign end")
})


module.exports = {
     courseRouter : courseRouter
}