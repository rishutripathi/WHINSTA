const express=require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const { check,validationResult }=require('express-validator');
var model=require("../model/schema.js")
const router=express.Router();
const bodyParser=require('body-parser');
const { send } = require('process');
const bPUEncoded=bodyParser.urlencoded({extended:false});                                                               // for expr.post
router.use(bPUEncoded);
router.use(bodyParser.json());

//---------------------------------------login form---------------------

router.get("/login",(req,res)=>{
    res.render("loginPage.ejs",{title:"Login"});
});
router.post("/login",(req,res)=>{
    console.log(req.body.password);
    // res.status(200).json({message:"Successfully Submitted"});
    model.find({usname:"rtrpwwe"})
.then((data)=>{if(data.length<1)
                      res.status(404).json({message:"User Not Found"});
               else{
                      bcrypt.compare(req.body.password, data[0].passw,(err,result)=>{
                         if(err){console.log(req.body.password);res.status(404).json({message:"Incorrect password"})}
                         if(result){
                            
                            console.log(data);res.status(200).json({message:"user found",result:data})}
                         })
                   }
            })                                                        
.catch((err)=>{res.json({message:"User Not Found",errors:err})});
});

//---------------------------------------signup form-------------------

router.get("/reg",(req,res)=>{
    res.render("regForm.ejs",{title:"Registration Form"});
});
router.post("/reg",(req,res)=>{
        var usname=req.body.usname;
        var name=req.body.name;
        var age=req.body.age;
        var role=req.body.role;
        var passw=req.body.passw;
        var cpassw=req.body.cpassw;
        console.log(cpassw);
      if(passw!==cpassw)
      res.json({message:"Password not matched with confirm password"});
      else{
        bcrypt.hash(passw, 6, function(err, hash){                                // bcrypt.hash(password, saltRounds, function(err, hash){
                 if(err)
                 res.json({message:"An unknown error has occured",error:err});
                 else{
                    var doc=new model({
                        usname:usname,
                        name:name,
                        age:age,
                        role:role,
                        passw:hash});
                doc.save({})
                .then((data)=>{console.log(doc);res.status(200).json({message:"Saved Successfully", result:data})})
                .catch((err)=>{console.log(err);res.json(err)});
                 }
        });
        }
});
router.get("/ser",(req,res)=>{
model.find({usname:"rtrpwwe"})
.then((data)=>{if(data.length<1)
                      res.status(404).json({message:"User Not Found"})
               else{
                      bcrypt.compare("wwe", data[0].passw,(err,result)=>{
                         if(err){console.log(req.body.password);res.status(404).json({message:"Incorrect password"})}
                         if(result){console.log(data);res.status(200).json({message:"user found",result:data})}
                         })
                   }
            })                                                        
.catch((err)=>{res.json({message:"User Not Found",errors:err})});
});
//-------------------------------------------------------------------

// router.get("",(req,res)=>{res.render('loginpage.ejs',{title:"Login", err:""})});

// router.post("",bPUEncoded,
// [check('username').notEmpty().withMessage('username missing').isEmail().withMessage("username must be email").isLength({min:4,max:20}).withMessage("Length must be greater than 3 and less than 20"),
// check('password').notEmpty().withMessage("Password missing").matches(/^[a-zA-Z0-9]{6,9}$/).withMessage("Length must be 6-9")],
// (req,res)=>{
//     var error=validationResult(req);
//     if(!error.isEmpty()){
//     res.render("loginpage.ejs",{title:"Login", err:error.mapped()});
//     }
//     else
//     //res.redirect("/app");
//     res.render("chatPage.ejs",{title:"Home Page"});
// });

router.get("/db",(res,req)=>{
    res.render("db.ejs",{title:"Database", err:""});
    });
router.post("/db",(res,req)=>{
    res.render("db.ejs",{title:"Database", err:""});
    });





module.exports=router;