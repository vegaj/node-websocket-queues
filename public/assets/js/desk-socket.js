var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
}

const labelDesk = $('#pepe')[0];
const desk = searchParams.get('desk');
const alerts = $('#pendings-alert');

labelDesk.innerHTML = desk;

var socket = io();

socket.on('pending', function(resp) {

    let count = resp.pending;
    console.log(count)
    if (count > 0) {
        $('#pending-count').text('RAMONE');
        $('#pending-count').text(count);
        alerts.removeAttr('hidden');
    } else {
        console.log('hiding')
        alerts.attr('hidden', true);
    }
});

$('#submit').on('click', function() {

    socket.emit('attend', { desk }, function(resp) {
        let ticket = 'Nobody';
        if (resp.ok) {
            $('#ticket')[0].innerText = resp.ticket.value;
        } else {
            $('#ticket')[0].innerText = 'Nobody'
            alert(resp.err);
        }

    });
})