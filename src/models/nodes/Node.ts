import {Identifier, INode, OutputPort, InputPort} from "./INode";
import {v4} from "uuid";
import {NodeType} from "./NodeType";

export class Node implements INode {
    id: Identifier;
    inputs: InputPort[];
    outputs: OutputPort[];
    type: NodeType;

    constructor(type : NodeType, inputs? : InputPort[], outputs? : OutputPort[]) {
        this.type = type
        this.inputs = inputs ?? []
        this.outputs = outputs ?? []
        this.id = v4()
    }
}