const TicketControl = require('../models/ticket-control.model');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado', socket.id);
    // });

    // Cuando un cliente se conecta
    socket.emit('current-status', ticketControl.last4);
    socket.emit('tickets-available', ticketControl.tickets.length);
    socket.emit('last-ticket', ticketControl.last);

    socket.on('next-ticket', (payload, callback) => {
        const nextTicket = ticketControl.nextTicket();
        callback(nextTicket);

        // TODO: notificar que hay nuevo ticket pendiente
        socket.broadcast.emit('tickets-available', ticketControl.tickets.length);
    });

    socket.on('attend-ticket', ({ desktop }, callback) => {
        if(!desktop) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio',
            })
        }

        const ticket = ticketControl.attendTicket(desktop);

        // TODO: Notificar cambios en los ultimos4
        socket.broadcast.emit('current-status', ticketControl.last4);
        socket.emit('tickets-available', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-available', ticketControl.tickets.length);

        if( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes',
            });
        } else {
            callback({
                ok: true,
                size: ticketControl.tickets.length,
                ticket,
            })
        }
    });
}

module.exports = {
    socketController,
};

