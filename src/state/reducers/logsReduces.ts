import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Identifier} from "../../models/typings/INode";

export interface ILogsState {
    logs : string[]
    isSubscribed : boolean
}

const initialState : ILogsState = {
    logs : [],
    isSubscribed : false
}


export const logsSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        startReceivingLogs: (state, {payload}: PayloadAction<Identifier> ) => {
            state.logs = []
            state.isSubscribed = true
        },
        stopReceivingLogs: (state, action : PayloadAction ) => {
            state.logs = []
            state.isSubscribed = false
        },
        pushLog: (state, {payload} : PayloadAction<string> ) => {
            state.logs.push(payload)
        },

    },

})

export const { startReceivingLogs, stopReceivingLogs, pushLog} = logsSlice.actions

export default logsSlice.reducer
