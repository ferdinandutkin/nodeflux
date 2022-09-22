import {INodeInfo} from "./INode";

export interface INodeFactory {
    createInstance(): INodeInfo

    preview: INodeInfo
}
