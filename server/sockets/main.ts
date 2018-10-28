
const io : SocketIO.Server = require('../server').io;

import { TicketControl } from '../classes/ticket-control';

const ticketControl = new TicketControl();

io.on('connect', (client: SocketIO.Socket ) => {

    //console.log(`Client ${client.id} connected`);
    client.on('nextTicket', (data, callback) => {
        

        let resp = ticketControl.getNextTicket();
        //Tell the desks that there is a new ticket pending.
        client.broadcast.emit('pending', {ok:true, pending: ticketControl.pendignCount()});
        
        return callback( {
            ok: true,
            ticket :resp,
        });
    })

    client.on('current', (data, callback) => {
        let last = ticketControl.getCurrent();
        return callback({ ok: true, last: last });
    });

    client.on('refresh', (data, callback)=>{
        callback(ticketControl.getAttended());
    });

    client.on('disconnect', () => {
        //console.log(`Client ${client.id} disconnected`);
    })

    client.on('attend', (data, callback) => {
        if (!data || !data.desk) {
            return callback({ok:false, err: 'provide a desk number'});
        }

        let resp = ticketControl.assignDesk(data.desk);

        callback(resp);

        if (resp.ok){
            client.broadcast.emit('announce', ticketControl.getAttended());

            //Tell to that desktop
            client.emit('pending', {ok:true, pending: ticketControl.pendignCount()});
            //Tell everyone
            client.broadcast.emit('pending', {ok:true, pending: ticketControl.pendignCount()});
        }
        
    });

});