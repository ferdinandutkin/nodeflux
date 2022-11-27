import {INode, NodeData} from "./INode";

export interface IButtonsNode extends INode {
    type: "buttons"
    data: TwoNodesData
}

export type TwoNodesData = NodeData & {

}



