import {Vector} from "./Vector";
import {NodeType} from "../nodes/NodeType";

export type Identifier = string

export type IOPort = {
    id : Identifier
    label? : string
}

export type InputPort = IOPort & {
    allowMultiple : boolean
}
export type OutputPort = IOPort;

export type NodeData = {
    title? : string
}

export interface INode {
    id : Identifier
    type : NodeType
    outputs : OutputPort[]
    inputs : InputPort[]
    data? : NodeData
}


export type Position = Vector

export interface INodeInfo extends INode {
     position : Position
     dimensions : Vector
}


