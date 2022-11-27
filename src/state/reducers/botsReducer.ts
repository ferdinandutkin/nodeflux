import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {deleteBot, getBots, postBot, PostBotParameters} from "../../api/requests";
import {Identifier} from "../../models/typings/INode";
import {BotState} from "../../models/BotState";
import {Bot} from "../../models/typings/Bot";




export interface IBotsState {
    bots : Bot[]
}

const initialState: IBotsState = {
    bots : []
}


export const retrieveBots = createAsyncThunk<Bot[]>
('bots/retrieveBots', async () => {
    const result = await getBots()
    return result.data
})




export const addBot = createAsyncThunk<Bot[], PostBotParameters>
('bots/addBot', async (bot) => {

    const result = await postBot(bot)

    return result.data
})

export const removeBot = createAsyncThunk<Bot[], Identifier>
('bots/removeBot', async (botId) => {

    const result = await deleteBot(botId)

    return result.data
})

export const botsSlice = createSlice({
    name: 'bots',
    initialState,
    reducers: {

        startBot: (state, action : PayloadAction<Identifier> ) => {
        },
        stopBot: (state, action : PayloadAction<Identifier> ) => {
        },
        setBotState: (state, {payload} : PayloadAction<{id : Identifier, state : BotState}> ) => {
            let bot = state.bots.find(bot => bot.id === payload.id)
            if (bot) {
                bot.state = payload.state
            }
        },
    },

    extraReducers: builder => {
        builder.addCase(retrieveBots.fulfilled, (state, {payload}) => {
          state.bots = payload
        })


        builder.addCase(addBot.fulfilled, (state, {payload}) => {
            state.bots = payload
        })

        builder.addCase(removeBot.fulfilled, (state, {payload}) => {
            state.bots = payload
        })
    }
})

export const { setBotState, startBot, stopBot} = botsSlice.actions

export default botsSlice.reducer
