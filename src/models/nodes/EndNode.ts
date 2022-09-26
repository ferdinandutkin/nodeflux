import {Node} from "./Node";

export class EndNode extends Node {
    constructor() {
        super("end", [{id: "end-input", allowMultiple: true}])
        this.id = "end"
    }
}