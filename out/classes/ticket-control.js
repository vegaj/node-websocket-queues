"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ticket_1 = require("./ticket");
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var TicketControl = /** @class */ (function () {
    function TicketControl() {
        this.tickets = [];
        this.attended = [];
        this.last = 0;
        this.today = new Date().getDate();
        var data = require('../data/data.json');
        if (data.day === this.today) {
            this.tickets = data.tickets;
            this.last = data.last;
            this.attended = data.attended;
        }
        else {
            this.save();
        }
    }
    TicketControl.prototype.getCurrent = function () {
        return this.last;
    };
    TicketControl.prototype.getNextTicket = function () {
        this.last++;
        this.tickets.push(new ticket_1.Ticket(this.last));
        this.save();
        return this.last;
    };
    TicketControl.prototype.assignDesk = function (desk) {
        var r = { ok: false };
        if (this.tickets.length === 0) {
            r.err = 'there are no tickets';
            return r;
        }
        var t = this.tickets[0];
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
    };
    TicketControl.prototype.getAttended = function () {
        return this.attended;
    };
    TicketControl.prototype.save = function (data) {
        if (data === void 0) { data = { tickets: this.tickets, last: this.last, day: this.today, attended: this.attended }; }
        var file = path_1.default.resolve(__dirname, '../data/data.json');
        fs.writeFile(file, JSON.stringify(data), function (err) {
            if (err)
                throw err;
        });
    };
    return TicketControl;
}());
exports.TicketControl = TicketControl;
