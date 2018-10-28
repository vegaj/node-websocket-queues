
const io : SocketIO.Server = require('../server').io;

import { TicketControl } from '../classes/ticket-control';

const ticketControl = new TicketControl();


io.on('connect', (client: SocketIO.Socket ) => {

    console.log(`Client ${client.id} connected`);
    client.on('nextTicket', (data, callback) => {
        return callback( {
            ok: false,
            ticket : ticketControl.getNextTicket(),
        });
    })

    client.on('current', (data, callback) => {
        let last = ticketControl.getCurrent();
        return callback({ ok: true, last: last });
    });

    client.on('refresh', (data, callback)=>{
        //callback(ticketControl.getAttended())
        callback();
    });

    client.on('disconnect', () => {
        console.log(`Client ${client.id} disconnected`);
    })

    client.on('attend', (data, callback) => {
        if (!data || !data.desk) {
            return callback({ok:false, err: 'provide a desk number'});
        }
        callback(ticketControl.assignDesk(data.desk));
        client.broadcast.emit('announce', ticketControl.getAttended());
    });

});