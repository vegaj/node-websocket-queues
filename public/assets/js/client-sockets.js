const sendButton = $('#send-button');
const status = $('#status');
const header = $('#header');
const log = $('#log');


sendButton.attr('disabled', true);

status.text('Connecting...');

var socket = io();

var clientTicket = undefined;

socket.on('connect', function() {

    header.text(`Please, wait to be attended`);
    status.text('Connected');

    status.toggleClass('status-disconnected', false);
    status.toggleClass('status-connected', true);

    sendButton.removeAttr('disabled');
    sendButton.text('Ask for a ticket');
});

socket.on('disconnect', function() {
    header.text(`Attempting to reconnect`);
    status.text(`Disconnected`);
    status.toggleClass('status-disconnected', true);
    status.toggleClass('status-connected', false);

    sendButton.attr('disabled', true);
});

socket.on('ticket-solved', function(ticket) {
    if (clientTicket === ticket) {
        clientTicket = undefined;
    }
})

$('#send-button').on('click', function() {
    socket.emit('nextTicket', null, function(resp) {
        if (resp.ok) {
            $('#ownTicket').text(resp.ticket);
            $('#send-button').attr('disabled', true);
            localStorage.setItem('ticket', resp.ticket);
        } else {
            $('#ownTicket').text(`${resp.ticket} same as before`);
            localStorage.setItem('ticket', resp.ticket);
        }
    });
});

$('#ask-last-button').on('click', function() {
    socket.emit('current', null, function(resp) {
        if (resp.ok) {
            $('#lastTicket').text(resp.last);
        } else {
            // $('#lastTicket').text('-');
        }
    });
});