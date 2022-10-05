import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Identifier} from "../../models/nodes/typings/INode";
import {connections} from "../initial";
import {Connection} from "../../models/Connection";
import {IConnection} from "../../models/nodes/typings/IConnection";


export interface IConnectionState {
    connections : IConnection[]
}

const initialState: IConnectionState = {
    connections
}

interface IFinishedConnection
{
    from : Identifier,
    to : Identifier
}

export const connectionsSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {
        connect: (state, {payload: {from, to}} : PayloadAction<IFinishedConnection> ) => {
                state.connections.push(new Connection(from, to))
        },
        disconnect: (state, {payload} : PayloadAction<Identifier> ) => {
            state.connections = state.connections.filter(connection => connection.id !== payload)
        },
        set: (state, {payload} : PayloadAction<IConnection[]> ) => {
            state.connections = payload
        }
    },
})

export const { connect, disconnect, set } = connectionsSlice.actions

export default connectionsSlice.reducer