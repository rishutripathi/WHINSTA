const express=require('express');
const expr=express();
const bodyParser=require('body-parser');
expr.use(bodyParser.json());
const path=require('path');
expr.set('view engine','ejs');
expr.set('views',path.resolve(__dirname,"views"));
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