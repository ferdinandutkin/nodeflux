import {INodeInfo} from "./nodes/INode";

export interface INodeFactory {
    createInstance(): INodeInfo

    preview: INodeInfo
}
