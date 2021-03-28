// Referemcoas HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket') 
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});

socket.on('last-ticket', (last_ticket) => {
    lblNuevoTicket.innerText = 'Ticket ' + last_ticket;
});


btnCrear.addEventListener( 'click', () => {
    
    socket.emit('next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});
