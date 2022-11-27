import {INode} from "./INode";
import {TextNodeData} from "./TextNodeData";

export interface ITextNode extends INode {
    type : "text",
    data : TextNodeData
}
