const express = require('express');
const http = require('http');
const cors = require("cors");
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);


app.use(cors());
const io = new Server(server,{
    cors:{
        origin:'https://chat-app-client-pcff0qqit-bijans-projects-7b51d8ab.vercel.app/',
        methods:["GET","POST"]
    }
});

server.listen(3001, () => console.log(`Server listening to port`, 3001));

io.on('connection',(socket)=>{
    console.log('New user connection id',socket.id);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User ID ${socket.id} joined room ${data}`); 
    })
    socket.on("send_msg",(data)=>{
        socket.to(data.room).emit("receive_msg",data)
    })
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
    })
})
