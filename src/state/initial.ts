import {NodeInfo} from "../models/NodeInfo";
import {buildTree} from "../models/buildTree";
import {InputPort, OutputPort} from "../models/IOPort";
import {Connection} from "../models/Connection";
import {StartNode} from "../models/nodes/StartNode";
import {EndNode} from "../models/nodes/EndNode";
import {v4} from "uuid";

const nodes =  [
    new NodeInfo(new StartNode()),
    new NodeInfo({type : "default", id : v4(), outputs : [new OutputPort()], inputs : [new InputPort()]}),
    new NodeInfo({type : "default", id : v4(), outputs : [new OutputPort()], inputs : [new InputPort()]}),
    new NodeInfo(new EndNode()),

]

export const connections =  [
    new Connection(nodes[0].outputs[0].id, nodes[1].inputs[0].id ),
    new Connection(nodes[1].outputs[0].id, nodes[2].inputs[0].id ),
    new Connection(nodes[1].outputs[0].id, nodes[3].inputs[0].id )
]

export const organizedNodes = buildTree(nodes,connections, nodes[0].id);