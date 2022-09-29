import {NodeType} from "../NodeType";
import {Vector} from "./Vector";

export type Identifier = string

export type IOPort = {
    id : Identifier
    label? : string
}

export type InputPort = IOPort & {
    allowMultiple : boolean
}
export type OutputPort = IOPort;



export interface INode {
    id : Identifier
    type : NodeType
    outputs : OutputPort[]
    inputs : InputPort[]
    data? : any
}


export type Position = Vector

export interface INodeInfo extends INode {
     position : Position
     dimensions : Vector
}


