export class Ticket {

    public desk ? : Number;
    public value : Number;

    constructor(value: number) {
        this.value = value;
        this.desk = undefined;
    }

}

module.exports.Ticket = Ticket;