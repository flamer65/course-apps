const { Router, express} = require("express");
const jwt = require('jsonwebtoken')
const {userModel, purchaseModel} = require('../db.js')
const bcrypt = require('bcrypt');
const {  JWT_USER_SECRET } =  require('../config.js')
const {usermiddle} = require('../middelware/usermiddeleware.js')
const userRouter = Router();

userRouter.post('/signup', async (req, res) =>{
    const { email, password , firstname,  lastname} = req.body;
    try{
        const hashpassword = await bcrypt.hash(password, 5)
        await userModel.create({
            email, password: hashpassword, firstname,  lastname
        });
        res.json({
            message: "Signup succeeded",
            p: password
        })
    }catch(e){
        console.log(e);
        res.status(403).json({
            error: e
        })
    }
})

userRouter.post('/signin', async (req, res) =>{
    const {email, password} = req.body;
    //user.safeParse(email, password);
    const access = await userModel.findOne({
        email
    })
    const passwordMatch =  bcrypt.compare(password, access.password);
    if(access && passwordMatch){
        const token = jwt.sign({
            id: access._id.toString()
        }, JWT_USER_SECRET);
        res.json({
            token: token
        })
    }else{
        res.status(403).send("wrong credantials")
    }
})
userRouter.get('/purchases', usermiddle,  (req, res)=>{
    
    res.send("sign end")
})
module.exports = {
     userRouter : userRouter
}