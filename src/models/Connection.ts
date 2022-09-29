import {v4} from "uuid";
import {Identifier} from "./nodes/typings/INode";
import {IConnection} from "./nodes/typings/IConnection";

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
