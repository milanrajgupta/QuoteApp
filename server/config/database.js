const mongoose=require('mongoose')
require("dotenv").config();


const connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database COnnected")
    }).catch((err)=>{
        console.log("Connection failed with DB",err)
    })
}


module.exports=connectDB