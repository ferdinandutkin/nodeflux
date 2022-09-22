export type NodeType = "start" | "end" | "default"

export type identifier = string

export type connectedNodeIdentifier = identifier | null


export interface INode {
    id : identifier
    type : NodeType
    inputs : connectedNodeIdentifier[]
    outputs : connectedNodeIdentifier[]
}

export type Vector = {
    X : number
    Y : number
}
export type Position = Vector

export interface INodeInfo extends INode {
     position : Position
     dimensions : Vector
}
// export interface IConnection {
//     id : string
//     from: INode | null
//     to: INode | null
// }

// type connectionCollection = IConnection[]
// {
//      [key: number]: connection;
// };

