import {INodeInfo} from "./nodes/typings/INode";

export interface INodeFactory {
    createInstance(): INodeInfo

    preview: INodeInfo
}
