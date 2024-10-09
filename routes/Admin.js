const {Router, express} = require("express");
const {adminModel, courseModel} = require('../db.js')
const bcrypt = require('bcrypt');
const { JWT_ADMIN_SECRET} =  require('../config.js')
const jwt = require('jsonwebtoken')
const {adminmiddle} = require('../middelware/adminmiddeleware.js')
const AdminRouter = Router();

AdminRouter.post('/signup', async (req, res) =>{
    const {email, password, firstname, lastname} =req.body;
    try{
        const hashpassword = await bcrypt.hash(password, 5)
        
        await adminModel.create({
            email, password: hashpassword , firstname, lastname
        });
        res.send("Signup Succeded")
    }catch(e){
        res.status(403).json({
            error: e
        })
    }
})

AdminRouter.post('/signin', async (req, res) =>{
    const {email, password} = req.body;
    const access = await adminModel.findOne({
        email
    })
    const passwordMatch =  bcrypt.compare(password, access.password);
    if(access && passwordMatch){
        const token = jwt.sign({
            id: access._id.toString()
        }, JWT_ADMIN_SECRET);
        res.json({
            token: token
        })
    }else{
        res.status(403).send("wrong credantials")
    }
})

AdminRouter.post('/course', adminmiddle, async  (req, res)=>{
    const adminID =  req.userId;
    const { title, discription ,price, imageURL} = req.body;
    try{
        const course = await courseModel.create({
            title, discription ,price, imageURL, createrId: adminID
        })
        res.json({
            message: "Course created",
            courseID: course._id
        })
    }catch(e){
    res.status(403).json({
        message: "invalid data",
        error: e
    })
}
    
})
AdminRouter.put('/course', adminmiddle, async  (req, res)=>{
    const createrID =  req.userId;
    const { title, discription ,price, imageURL, courseId} = req.body;
    try{
      await courseModel.updateOne({_id: courseId , createrId: createrID},
        {
            title, discription ,price, imageURL
        }
    )
        res.json({
            message: "Course updated",
        })
    }catch(e){
    res.status(403).json({
        message: "invalid data",
        error: e
    })
}
    
})
AdminRouter.get('/course/bulk', adminmiddle, async (req, res) =>{
    const adminId = req.userId;
    const course = await courseModel.find({
        createrId: adminId
    })
    res.json({
        message: "Course updated",
        course
    })
})
module.exports = {
    AdminRouter: AdminRouter

}