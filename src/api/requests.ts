import axios from 'axios';
import {INode} from "../models/nodes/typings/INode";
import {IConnection} from "../models/nodes/typings/IConnection";

const client = axios.create()


export const getConnections = () => {
    return client.get<IConnection[]>('nodes')
}

export const getNodes = () => {
    return client.get<INode[]>('connections')
}

export const postNodes = (nodes : INode[]) => {
    return client.post('api/Nodes/addMany', nodes)
}

export const postConnections = (connections : IConnection[]) => {
    return client.post('api/Connections/addMany', connections)
}