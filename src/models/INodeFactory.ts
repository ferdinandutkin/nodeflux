import {INodeInfo} from "./typings/INode";

export interface INodeFactory {
    createInstance(): INodeInfo

    preview: INodeInfo
}
