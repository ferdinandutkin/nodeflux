import {NodeType} from "./nodes/NodeType";
import {Identifier, INode, INodeInfo, InputPort, IOPort, NodeData, Position} from "./typings/INode";
import {Vector} from "./typings/Vector";


export class NodeInfo implements INodeInfo {
    dimensions: Vector;
    position: Position;
    id: Identifier;
    type: NodeType;
    outputs: IOPort[];
    inputs: InputPort[];
    data?: NodeData;

    constructor(node: INode) {
        this.dimensions = {x: 200, y: 200}
        this.position = {x: 0, y: 0}
        this.id = node.id
        this.type = node.type
        this.outputs = node.outputs;
        this.inputs = node.inputs
        this.data = node.data
    }
}
