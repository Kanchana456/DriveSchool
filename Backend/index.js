const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./Route/UserRoutes");
const paymentRouter = require("./Route/PaymentRoutes");
const instructorRouter = require("./Route/InstructorRouter");
const feedbackRouter = require('./Route/feedbackRoutes');
const appointmentRouter = require('./Route/appoinmentRoutes');
const userRouters = require('./Route/userRoutess');
const addcourseRouter = require('./Route/AddcourseRouter');

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/payments", paymentRouter);
app.use("/instructors", instructorRouter);
app.use("/feedback",feedbackRouter);
app.use("/appointments", appointmentRouter);
app.use("/userss", userRouters);
app.use("/Addcourse", addcourseRouter);

mongoose.connect("mongodb+srv://kanchana:kanchana@userdb.0k55m.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err)=>console.log((err)));

require("./Model/Register");
const User = mongoose.model("Register");
app.post("/register",async(req,res)=>{
    const {name,gmail,password} = req.body;
    try{
        await User.create({
            name,
            gmail,
            password
        })
        res.send({status: "ok"});

    }catch(err){
       res.send({status: "err"}); 
    }

});

app.post("/login",async(req,res)=>{
    const {gmail,password} = req.body;
    try{
        const user = await User.findOne({gmail});
        if(!user){
            return res.json({err:"user not found"})
        }
        if(user.password === password){
            return res.send({status:"ok"});
        }
        else{
            return re.send({err:"incorrect Password"});
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({err:"server Err"})
    }
})

