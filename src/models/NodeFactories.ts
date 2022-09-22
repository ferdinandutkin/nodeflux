import {INodeFactory} from "./INodeFactory";
import {NodeInfo} from "./NodeInfo";
import {INodeInfo} from "./INode";
import {v4} from 'uuid';

export class StartNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo({type : "start", id : v4(), inputs : [], outputs : [null]})
    }
    preview: INodeInfo;
}

export class EndNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo({type : "end", id : v4(), inputs : [null], outputs : []})
    }
    preview: INodeInfo;
}

export class DefaultNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo({type : "default", id : v4(), inputs : [null], outputs : [null]})
    }
    preview: INodeInfo;
}