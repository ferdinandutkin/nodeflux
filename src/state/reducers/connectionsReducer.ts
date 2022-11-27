import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {connections} from "../initial";
import {Connection} from "../../models/Connection";
import {IConnection} from "../../models/typings/IConnection";
import {Identifier} from "../../models/typings/INode";
import {removeNode, removeOutput} from "./nodesReducer";

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
        setConnections: (state, {payload} : PayloadAction<IConnection[]> ) => {
            state.connections = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(removeNode, (state, {payload}) => {
          state.connections =
              state.connections.
                filter(connection =>
                  !(
                      payload.inputs.some(input => input.id == connection.to)
                      ||
                      payload.outputs.some(output => output.id == connection.from)
                  )
              )
        }).addCase(removeOutput, (state, {payload}) => {
            state.connections = state.connections.filter(connection => connection.from !== payload)
        })
    }

})

export const { connect, disconnect, setConnections } = connectionsSlice.actions

export default connectionsSlice.reducer
