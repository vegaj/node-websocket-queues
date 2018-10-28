
import {Ticket} from './ticket';
import * as fs from 'fs';
import { Response } from '../Response';
import path from 'path';

export class TicketControl {
    
    private tickets : Ticket[];
    private attended : Ticket[];
    private last : number;
    private today : number;

    constructor() {
        this.tickets = [];
        this.attended = [];
        this.last = 0;
        this.today = new Date().getDate();

        let data = require('../data/data.json');
        if (data.day === this.today) {
            this.tickets = data.tickets;
            this.last = data.last;
            this.attended = data.attended;
        } else {
            this.save();
        }
    }

    public getCurrent() : number {
        return this.last;
    }

    public getNextTicket() : number {
        
        this.last++;
        this.tickets.push(new Ticket(this.last));

        this.save();
        return this.last;
    }

    public solveTicket(ticket: number) {
        this.tickets = this.tickets.filter(x => x.value !== ticket);
    }

    public assignDesk(desk :number) : Response {
        let r :Response = { ok : false};
        
        if (this.tickets.length === 0) {
            r.err = 'there are no tickets';
            return r;
        }

        let t :Ticket = this.tickets[0];
        this.tickets.shift();

        t.desk = desk;
        this.attended.push(t);
        if (this.attended.length > 4) {
            this.attended.shift();
        }


        this.save();
        r.ok = true;
        r.ticket = t;
        return r;
    }

    public getAttended() : Ticket[]{
        return this.attended;
    }

    private save(data = {tickets: this.tickets, last: this.last, day: this.today, attended: this.attended}) {
        let file = path.resolve( __dirname, '../data/data.json');
        fs.writeFile(file, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
        
    }
}