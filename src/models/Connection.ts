import {v4} from "uuid";
import {Identifier} from "./typings/INode";
import {IConnection} from "./typings/IConnection";


export class Connection implements IConnection {
    constructor(from : Identifier, to : Identifier) {
        this.from = from
        this.to = to
        this.id = v4();
    }

    from: Identifier;
    to: Identifier;
    id: Identifier;
}
