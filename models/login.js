const mongoose = require("mongoose");

const logInSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type: String,
            required:true
        }
        // role:{
        //     type:String,required:true
        // }
    })

const collection=new mongoose.model("Collection",logInSchema);
module.exports=collection;
