import {combineReducers, configureStore} from '@reduxjs/toolkit'
import nodesReducer from "./reducers/nodesReducer";
import connectionsReducer from "./reducers/connectionsReducer";
import userBotsReducer, {UsersBots} from "./reducers/userBotsReducer"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {Identifier, INode, INodeInfo} from "../models/typings/INode";
import storage from 'redux-persist/lib/storage';
import {IConnection} from "../models/typings/IConnection";
import userReducer from "./reducers/userReducer";
import { persistStore, persistReducer } from 'redux-persist'
import botsReducer from "./reducers/botsReducer";
import { SignalRMiddleware} from "../api/signalr/SignalRMiddleware";
import logsReducer from "./reducers/logsReduces";
import {Bot} from "../models/typings/Bot";
import {BotState} from "../models/BotState";


const rootReducer = combineReducers(
    {
        nodes : nodesReducer,
        connections : connectionsReducer,
        users: userReducer,
        bots : botsReducer,
        logs : logsReducer,
        userBots : userBotsReducer
    });




const persistConfig = {
    key: 'root',
    storage,
}



export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false,


    }).prepend(SignalRMiddleware)

})

export type StoreType = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>()


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)


export const useNodes = <TSelected>(selector : (state: INodeInfo[]) => TSelected) => useAppSelector(state => selector(state.nodes.nodes))

export const useConnections = <TSelected>(selector : (state: IConnection[]) => TSelected) => useAppSelector(state => selector(state.connections.connections))

export const useBots = () => useAppSelector(state => state.bots.bots)

export const useUserBots = () => useAppSelector(state => state.userBots.userBots as UsersBots[])

export const useUsersBots = (userId : Identifier) => useAppSelector(state => state.userBots.userBots.find((usersBot : UsersBots) => usersBot.id === userId) as UsersBots)

export const useIsAuthenticated = () => useAppSelector(state => !!state.users.token)

export const useLogin = () => useAppSelector(state => state.users.login)

export const useRoles = () => useAppSelector(state => state.users.roles ?? [])

export const useBot = (botId : Identifier) => useAppSelector(state => state.bots.bots.find((bot : Bot) => bot.id == botId) as Bot)

export const useBotState = (botId : Identifier) => useAppSelector(state => state.bots.bots.find((bot : Bot) => bot.id == botId).state as BotState)

export const useInputOwner = (inputId : Identifier) => useAppSelector(state => state.nodes.nodes.filter((node : INode) => node.inputs.some(input => input.id === inputId))[0] as INode)

export const useOutputOwner = (outputId : Identifier) => useAppSelector(state => state.nodes.nodes.filter((node : INode) => node.outputs.some(output => output.id === outputId))[0] as INode)

export const useNodeOutputs = (nodeId : Identifier) => useNodes(nodes => nodes.find(node => node.id === nodeId)?.outputs ?? [])
