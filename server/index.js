const http=require("http");
const express=require("express");
const cors=require("cors");
const socketIO=require("socket.io");

const app=express();
app.use(cors());

const users=[{}];

app.get("/",(req,res)=>{
    res.send("Home");
})

const server=http.createServer(app);

const io=socketIO(server);
io.on("connection",(socket)=>{
    console.log("new connection");

    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`});
        socket.emit('welcome',{user:'Admin',message:` ${users[socket.id]} Welcome to ChatBuddy!!`});
    })

    socket.on("message",({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
        console.log(message);
    })

    socket.on('disconnect',()=>{
        console.log("user left")
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});
    })
    
    console.log(users)
})

server.listen(4500,()=>{
    console.log("Listening......");
})