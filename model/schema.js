const mongoose=require("mongoose");
const schema=mongoose.Schema({
    usname:{type:String},
    name:String,
    age:{type:Number},
    role:{type:String,required:true},
    passw:{type:String,required:true},      
    cpassw:String
},{versionKey:false});

module.exports=new mongoose.model("userRegistrationForms",schema);