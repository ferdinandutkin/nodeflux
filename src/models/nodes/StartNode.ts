import {Node} from './Node'
import {IStartNode} from "./typings/IStartNode";

export class StartNode extends Node implements IStartNode {

    constructor() {
        super("start", undefined, [{id : "start"}]);
        this.id = "start"
    }

    type : "start" = "start"
    data!: never;
}


