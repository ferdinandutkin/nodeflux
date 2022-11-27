import {INodeFactory} from "./INodeFactory";
import {NodeInfo} from "./NodeInfo";
import {v4} from 'uuid';
import {InputPort, OutputPort} from "./IOPort";
import {StartNode} from "./nodes/StartNode";
import {INodeInfo} from "./typings/INode";
import {TextNodeData} from "./typings/TextNodeData";

export class StartNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): NodeInfo {
        return new NodeInfo(new StartNode())
    }
    preview: INodeInfo;
}

export class EndNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): INodeInfo {
        return new NodeInfo({type : "end", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})
    }
    preview: INodeInfo;
}

export class DefaultNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): INodeInfo {
        return new NodeInfo({type : "default", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})
    }
    preview: INodeInfo;
}


export class ButtonsNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): INodeInfo {
        let node = new NodeInfo({type : "buttons", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})

        node.data  = {title: "title (click to change)"}


        return node
    }
    preview: INodeInfo;
}



export class KeyboardNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): INodeInfo {
        let node = new NodeInfo({type : "keyboard", id : v4(), inputs : [new InputPort()], outputs :
                [new OutputPort(), new OutputPort(), new OutputPort()]})

        node.data  = {title: "title (click to change)"}


        return node
    }
    preview: INodeInfo;
}

export class TextNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): INodeInfo {
        let node = new NodeInfo({type : "text", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})
        let data : TextNodeData  = {title: "title (click to change)", text : "based"}
        node.data = data
        return node
    }
    preview: INodeInfo;
}

export class CommandsNodeFactory implements INodeFactory {
    constructor() {
        this.preview = this.createInstance()
    }
    createInstance(): INodeInfo {
        let node = new NodeInfo({type : "commands", id : v4(), inputs : [new InputPort()], outputs : [new OutputPort()]})

        node.data  = {title: "title (click to change)"}
        
        return node
    }
    preview: INodeInfo;
}
