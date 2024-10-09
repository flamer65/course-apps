const {Router} = require("express");
const {UserModel, AdminModel, CourseModel, courseModel} = require("../db")
const {usermiddle} = require("../middelware/usermiddeleware")
const courseRouter = Router();

courseRouter.post('/purchase', usermiddle, async (req, res) =>{
    const userId = req.userId;
    const courseId = req.body.courseId;

     await CourseModel.create({
        userId,
        courseId
     });
     res.json({
        message: "you have succesfully bought the course"
     })
})


courseRouter.get('/preview', async (req, res) =>{
   const course = await courseModel.find({});
   res.json({
     course
   })
})


module.exports = {
     courseRouter : courseRouter
}