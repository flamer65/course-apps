require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const { userRouter } = require("./routes/user.js");
const { courseRouter } = require("./routes/course.js");
const { AdminRouter } = require("./routes/Admin.js");
const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/course', courseRouter);
connect();
async function connect(){
   await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to the db");
    app.listen(3000);
    console.log('listening to port 3000');
}
