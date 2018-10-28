console.log('js loaded');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
}

const labelDesk = $('#pepe')[0];
const desk = searchParams.get('desk');

labelDesk.innerHTML = desk;

var socket = io();


$('#submit').on('click', function() {

    socket.emit('attend', { desk }, function(resp) {
        let ticket = 'Nobody';
        console.log(resp)
        if (resp.ok) {
            $('#ticket')[0].innerText = resp.ticket.value;
        } else {
            $('#ticket')[0].innerText = 'Nobody'
        }

    });
})