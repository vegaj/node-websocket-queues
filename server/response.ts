import { Ticket } from "./classes/ticket";

export interface Response {
    ok: boolean;
    err? : String;
    ticket? : Ticket;
}