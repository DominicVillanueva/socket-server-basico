
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAttend.disabled = true;
});

socket.on('last-ticket', (last_ticket) => {
    // lblNuevoTicket.innerText = 'Ticket ' + last_ticket;
});

socket.on('tickets-available', (tickets_size) => {
    if(tickets_size === 0) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.innerText = tickets_size;
        lblPendientes.style.display = '';
    }
})


btnAttend.addEventListener( 'click', () => {

    socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg, size }) => {
        if(!ok) {
            lblTicket.innerText = 'Nadie.';
            return divAlert.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ ticket.number }`;
        lblPendientes.innerText = size;
    });
    // socket.emit('next-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});