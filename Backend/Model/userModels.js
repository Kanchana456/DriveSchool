const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchemas=new Schema({
    name:{
        type:String,
        requird:true,
    },

    
    age:{
        type:String,
        requird:true,
    },

    startDate: {
        type: Date,
        default: Date.now
    },

    studentProgress: {
        type: String,
        enum: ['Not Started', 'Theory Learning', 'Theory Test Passed', 'Practical Training', 'Ready for License Test', 'Licensed'],
        default: 'Not Started'
    }

  
})

module.exports=mongoose.model(
    "Progresses",
     userSchemas
)