import {Node} from './Node'


export class StartNode extends Node {
    constructor() {
        super("start", undefined, [{id : "start-output"}])
        this.id = "start"
    }
}


