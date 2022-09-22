import {connectedNodeIdentifier, identifier} from "../models/INode";

export type TransputProps = {index : number}
export type InputProps = TransputProps & {from : connectedNodeIdentifier, to : identifier}
export type OutputProps = TransputProps & {from : identifier, to : connectedNodeIdentifier}