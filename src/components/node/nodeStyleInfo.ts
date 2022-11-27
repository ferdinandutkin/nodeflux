import {NodeType} from "../../models/nodes/NodeType";

let nodeColors : TypeColorDict = {
    "start" : "red",
    "default" : "yellow",
    "end" : "blue",
    "buttons" : "purple",
    "commands" : "plum",
    "keyboard" : "purple",
    "text" : "#ffffee"
}


type TypeColorDict = {
    [key in NodeType]: string;
};


export const getNodeColor = (nodeType : NodeType) => nodeColors[nodeType];
