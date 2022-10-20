export function socketConnection(io: any) {
    io.on("connection", (socket: any) => {
        console.log(`Connection from ${socket.id}`);
        io.to(socket.id).emit("got_id", socket.id);
        socket.on("test", (data: any) => {
            console.log(data);
            socket.emit("test", data);
        })
    });
}