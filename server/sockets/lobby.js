exports.lobby=(io)=>{
    io.on("connection",(socket)=>{
        console.log("New Connection");
        socket.emit("me",socket.id);
        console.log(socket.id);
        socket.on("disconnect",()=>{
            socket.broadcast.emit("callEnded")
        })
        socket.on("callUser",({userToCall,signalData,from,name})=>{
            io.to(userToCall).emit("callUser",{signal:signalData,from,name})
        });
        socket.on("answerCall",(data)=>{
            io.to(data.to).emit("callAccepted",data.signal);
        });
        // socket.on("join",(data)=>{
        //     console.log(data);
        //     socket.join(data.room);
        //     io.to(data.room).emit("joined",data);
        // })
        // socket.on("message",(data)=>{
        //     console.log(data);
        //     io.to(data.room).emit("newMessage",data);
        // })
    })
}