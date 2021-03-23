
const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('send-message', (payload, callback) => {
        
        const id = 123456789;
        callback(id);

        // Notificar a todos los usuarios conectados
        socket.broadcast.emit('send-message', payload);
    });
}

module.exports = {
    socketController,
};

