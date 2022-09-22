import {connectedNodeIdentifier, identifier, INode, INodeInfo, NodeType, Position, Vector} from "./INode";


export class NodeInfo implements INodeInfo {
    dimensions: Vector;
    position: Position;
    id: identifier;
    outputs: connectedNodeIdentifier[];
    inputs: connectedNodeIdentifier[];
    type: NodeType;


    constructor(node: INode) {
        this.dimensions = {X: 200, Y: 200}
        this.position = {X: 0, Y: 0}
        this.id = node.id
        this.type = node.type
        this.inputs = node.inputs
        this.outputs = node.outputs
        
    }




}