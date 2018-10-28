const socket = io();

const panel = [];
const errPanel = $('#err-pane');
const errMsg = $('#err-msg');

var audio;
for (i = 0; i < 4; i++) {
    panel[i] = {
        //ticket: $(`#lbl-t-${i}`)[0],
        ticket: $(`#lbl-t-${i}`),
        //desk: $(`#lbl-d-${i}`)[0]
        desk: $(`#lbl-d-${i}`)
    }
}

socket.on('announce', refreshPanel);

socket.on('connect', function() {
    socket.emit('refresh', null, refreshPanel);
    removeErrorPanel();
});

function refreshPanel(list) {
    console.log(list);
    if (list === undefined) {
        displayErrorPanel('Nothing to display at the moment');
        return setTimeout(removeErrorPanel, 3000);
    }

    for (i = 0; i < panel.length; i++) {
        var ticket = list.pop();

        if (ticket) {
            panel[i].ticket.text(ticket.value);
            panel[i].desk.text(ticket.desk);
        } else {
            panel[i].ticket.text("-");
            panel[i].desk.text("-");
        }

    }
    audio = new Audio("/assets/audio/ticket.mp3");
    audio.play();
}

socket.on('disconnect', function() {
    displayErrorPanel('Connection lost. Retrying...');
});

function removeErrorPanel() {
    errPanel.attr('hidden', true);
}

function displayErrorPanel(err) {
    console.log('aa');
    errPanel.removeAttr('hidden');
    console.log('b');
    errMsg.text(err);
}