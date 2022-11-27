import {Node} from './Node'
import {OutputPort} from "../IOPort";
import {IStartNode} from "../typings/IStartNode";

export class StartNode extends Node implements IStartNode {

    constructor() {
        super("start", undefined, [new OutputPort()]);
    }

    type : "start" = "start"
    data!: never;
}


