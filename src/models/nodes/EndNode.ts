import {Node} from "./Node";
import {InputPort} from "../IOPort";

export class EndNode extends Node {
    constructor() {
        super("end", [new InputPort(true)])
    }
}