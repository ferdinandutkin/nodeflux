import {Identifier, INode} from "./INode";
import {IConnection} from "./IConnection";

export interface IStateMachineConfiguration {
    nodes : INode[];
    connections : IConnection[];
}