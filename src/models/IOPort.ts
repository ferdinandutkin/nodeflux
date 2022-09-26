import {Identifier, InputPort as IInputPort, OutputPort as IOutputPort, IOPort as IIOPort} from "./nodes/INode";
import {v4} from "uuid";


export class IOPort implements IIOPort {
    id: Identifier;
    label?: string;

    constructor(label? : string) {
        this.label = label
        this.id = v4()
    }
}


export class InputPort extends IOPort implements IInputPort {
    allowMultiple: boolean;
    constructor(allowMultiple? : boolean) {
        super();

        this.allowMultiple = allowMultiple ?? false
    }
}

export class OutputPort extends IOPort implements IOutputPort {
}