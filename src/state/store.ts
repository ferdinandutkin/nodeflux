import {combineReducers, configureStore} from '@reduxjs/toolkit'
import nodesReducer from "./reducers/nodesReducer";
import connectionsReducer from "./reducers/connectionsReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {INodeInfo} from "../models/nodes/typings/INode";
import {IConnection} from "../models/nodes/typings/IConnection";


export const store = configureStore({
    reducer: combineReducers(
        {
            nodes : nodesReducer,
            connections : connectionsReducer
        }),
})




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>()


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useNodes = <TSelected>(selector : (state: INodeInfo[]) => TSelected) => useAppSelector(state => selector(state.nodes.nodes))


export const useConnections = <TSelected>(selector : (state: IConnection[]) => TSelected) => useAppSelector(state => selector(state.connections.connections))


