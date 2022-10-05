import {Node} from './Node'
import {IStartNode} from "./typings/IStartNode";
import {OutputPort} from "../IOPort";

export class StartNode extends Node implements IStartNode {

    constructor() {
        super("start", undefined, [new OutputPort()]);
    }

    type : "start" = "start"
    data!: never;
}


