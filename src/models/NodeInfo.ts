import {Identifier, INode, INodeInfo, Position, InputPort, IOPort} from "./nodes/INode";
import {Vector} from "./nodes/Vector";
import {NodeType} from "./nodes/NodeType";


export class NodeInfo implements INodeInfo {
    dimensions: Vector;
    position: Position;
    id: Identifier;
    type: NodeType;
    outputs: IOPort[];
    inputs: InputPort[];

    constructor(node: INode) {
        this.dimensions = {x: 200, y: 200}
        this.position = {x: 0, y: 0}
        this.id = node.id
        this.type = node.type
        this.outputs = node.outputs;
        this.inputs = node.inputs
    }
}