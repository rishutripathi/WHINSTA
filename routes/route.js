const express=require('express');
const path=require('path');
const { check,validationResult }=require('express-validator');
const router=express.Router();
const bodyParser=require('body-parser');
const bPUEncoded=bodyParser.urlencoded({extended:false});                                                               // for expr.post
router.use(bPUEncoded);
router.use(bodyParser.json());

router.get("",(req,res)=>{res.render('loginpage.ejs',{title:"Login", err:""})});

router.post("",bPUEncoded,
[check('username').notEmpty().withMessage('username missing').isEmail().withMessage("username must be email").isLength({min:4,max:20}).withMessage("Length must be greater than 3 and less than 20"),
check('password').notEmpty().withMessage("Password missing").matches(/^[a-zA-Z0-9]{6,9}$/).withMessage("Length must be 6-9")],
(req,res)=>{
    var error=validationResult(req);
    if(!error.isEmpty()){
    res.render("loginpage.ejs",{title:"Login", err:error.mapped()});
    }
    else
    //res.redirect("/app");
    res.render("chatPage.ejs",{title:"Home Page"});
});





module.exports=router;