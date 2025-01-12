const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String , unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const adminSchema = new Schema({
    email: {type: String , unique: true},
    password: String,
    firstname: String,
    lastname: String
})
const courseSchema = new Schema({
    title: String,
    discription: String,
    price: Number,
    imageURL: String,
    createrId: ObjectId
})

const purchaseSchema = new Schema({
    userID: ObjectId,
    courseID: ObjectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}