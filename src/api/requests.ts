import axios from 'axios';
import {IConnection} from "../models/typings/IConnection";
import {Identifier, INode} from "../models/typings/INode";
import {IStateMachineConfiguration} from "../models/typings/IStateMachineConfiguration";
import {Role} from "../models/Role";
import {Bot} from "../models/typings/Bot";
import {User} from "../models/User";

export const client = axios.create({baseURL: 'https://localhost:7109/api/'})



export const getConnections = () => {
    return client.get<IConnection[]>('nodes')
}

export const getNodes = () => {
    return client.get<INode[]>('connections')
}

export const postNodes = (nodes : INode[]) => {
    return client.post('Nodes/addMany', nodes)
}



export const getStateMachineConfiguration = (botId : Identifier) => {
    return client.get<IStateMachineConfiguration>('Bots/config', {params : {botId}})
}


export const saveStateMachineConfiguration = (botId : Identifier, config : IStateMachineConfiguration) => {
    return client.put('Bots/config',  {id : botId, ...config})
}


export const getBotsByUserId = (id : Identifier) => {
    return client.get<Bot[]>(`Bots/bots/${id}`)
}


export const getBots = () => {
    return client.get<Bot[]>('Bots/bots')
}


export const getUsers = () => {
    return client.get<User[]>('User')
}


export type PostBotParameters = {
    key : Identifier
    name : string
}

export const postBot = (bot : PostBotParameters) => {
    return client.post<Bot[]>('Bots/add', bot)
}
export const deleteBot = (id : Identifier) => {
    return client.delete<Bot[]>(`Bots/${id}`)
}

export const getDefaultBotName = (key : Identifier) => {
    return client.get<string>(`Bots/defaultName`, {params : {key}})
}

export type AuthenticationResult =
{
    isSuccessful : boolean,
    login? : string,
    roles? : Role[],
    token? : string
}

export type Credentials = {login : string, password : string}

export const postLogin = (credentials : Credentials) => {
    return client.post<AuthenticationResult>('User/login', credentials)
}


export const postRegister = (credentials : Credentials) => {
    return client.post<AuthenticationResult>('User/register', credentials)
}
