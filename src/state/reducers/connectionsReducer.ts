import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Identifier} from "../../models/nodes/INode";
import {connections} from "../initial";
import {Connection} from "../../models/Connection";
import {IConnection} from "../../models/nodes/IConnection";


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
        }
    },
})

export const { connect, disconnect } = connectionsSlice.actions

export default connectionsSlice.reducer