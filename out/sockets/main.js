"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require('../server').io;
var ticket_control_1 = require("../classes/ticket-control");
var ticketControl = new ticket_control_1.TicketControl();
io.on('connect', function (client) {
    //console.log(`Client ${client.id} connected`);
    client.on('nextTicket', function (data, callback) {
        var resp = ticketControl.getNextTicket();
        //Tell the desks that there is a new ticket pending.
        client.broadcast.emit('pending', { ok: true, pending: ticketControl.pendignCount() });
        return callback({
            ok: true,
            ticket: resp,
        });
    });
    client.on('current', function (data, callback) {
        var last = ticketControl.getCurrent();
        return callback({ ok: true, last: last });
    });
    client.on('refresh', function (data, callback) {
        callback(ticketControl.getAttended());
    });
    client.on('disconnect', function () {
        //console.log(`Client ${client.id} disconnected`);
    });
    client.on('attend', function (data, callback) {
        if (!data || !data.desk) {
            return callback({ ok: false, err: 'provide a desk number' });
        }
        var resp = ticketControl.assignDesk(data.desk);
        callback(resp);
        if (resp.ok) {
            client.broadcast.emit('announce', ticketControl.getAttended());
            //Tell to that desktop
            client.emit('pending', { ok: true, pending: ticketControl.pendignCount() });
            //Tell everyone
            client.broadcast.emit('pending', { ok: true, pending: ticketControl.pendignCount() });
        }
    });
});
