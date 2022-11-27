import {v4} from "uuid";
import {NodeType} from "./NodeType";
import {Identifier, INode, InputPort, NodeData, OutputPort} from "../typings/INode";

export class Node implements INode {
    id: Identifier;
    inputs: InputPort[];
    outputs: OutputPort[];
    type: NodeType;
    data : NodeData;

    constructor(type : NodeType, inputs? : InputPort[], outputs? : OutputPort[], data?: NodeData) {
        this.type = type
        this.inputs = inputs ?? []
        this.outputs = outputs ?? []
        this.id = v4()
        this.data = data ?? {}
    }
}