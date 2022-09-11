const socket=io();
const msgText=document.querySelector("#msg");
const btnSend=document.querySelector("#button-send");
const chatBox=document.querySelector(".chat-content");
const displayMsg=document.querySelector(".message");
 var uName;
 do{
    uName=prompt("Your name?It must be different from the other users");
}while(!uName)

 document.querySelector("#your-name").textContent=uName;
 document.querySelector("#msg").focus();
 
document.querySelector("#button-send").setAttribute("disabled","disabled");
document.querySelector("#msg").addEventListener("input",()=>{
        if(document.querySelector("#msg").value.length==0 || document.querySelector("#msg").value==""){
            document.querySelector("#button-send").setAttribute("disabled","disabled");}
        else
            document.querySelector("#button-send").removeAttribute("disabled");
}); 

document.querySelector("#button-send").addEventListener("click",(e)=>{
    e.preventDefault();
   sendMsg(document.querySelector("#msg").value);
   document.querySelector("#msg").value="";
   document.querySelector("#msg").focus();
   document.querySelector(".chat-content").scrollTop=document.querySelector(".chat-content").scrollHeight;
});

const sendMsg=message=>{
    let msg={
        user:uName,
        message:message.trim()
    }
    display(msg,'your-message');

    socket.emit("sendMessage",msg);
}

socket.on("sendToAll",(msg)=>{
    display(msg,'other-message');
});

function display(msg, type){
    var msgDiv=document.createElement('div');
    let className=type;
    msgDiv.classList.add(className,'message-row');
    msgDiv.innerHTML="<div class='message-title'><span>"+msg.user+"</span></div><div class='message-text'>"+msg.message+"</div><div class='message-time'>"+new Date().toLocaleString()+"</div>";
    document.querySelector(".message").appendChild(msgDiv);
    document.querySelector(".chat-content").scrollTop=document.querySelector(".chat-content").scrollHeight;
}
