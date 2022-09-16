const express=require('express');
const expr=express();
const mongoose=require('mongoose');
mongoose.pluralize(null);
const bcrypt=require('bcrypt');
const bodyParser=require('body-parser');
expr.use(bodyParser.json());
var model=require("./model/schema.js")
const path=require('path');
expr.set('view engine','ejs');
expr.set('views',path.resolve(__dirname,"views"));
var session=require('express-session');
expr.use(session({
    secret:"Hello",
    resave:false,
    saveUninitialized:true
}));
const router=require('./routes/route.js');
expr.use(router);
expr.use(express.static(path.resolve(__dirname)));
const port=process.env.PORT || 8000;    
const server=require('http').createServer(expr);
const io=require('socket.io')(server);
io.on('connection',socket=>{console.log("Socket Connected");
socket.on("sendMessage",(msg)=>{
    // console.log(msg);
    socket.broadcast.emit("sendToAll",msg); });
});

server.listen(port,()=>{console.log("Server is running on localhost:%d",port);});

var db='Users';
mongoose.connect("mongodb://localhost:27017/"+db,{useNewUrlParser:true});
const connection=mongoose.connection;
connection.on("error",()=>{throw new Error(error);});
connection.once("open",()=>{console.log("Connected to Mongoose");});

