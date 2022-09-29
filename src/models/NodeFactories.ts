import {INodeFactory} from "./INodeFactory";
import {NodeInfo} from "./NodeInfo";
import {INodeInfo} from "./nodes/typings/INode";
import {v4} from 'uuid';
import {InputPort, OutputPort} from "./IOPort";

export class StartNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo({type : "start", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})
    }
    preview: INodeInfo;
}

export class EndNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo({type : "end", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})
    }
    preview: INodeInfo;
}

export class DefaultNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo({type : "default", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})
    }
    preview: INodeInfo;
}


export class ButtonsNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo({type : "buttons", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})
    }
    preview: INodeInfo;
}