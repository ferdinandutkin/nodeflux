import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getBotsByUserId, getUsers} from "../../api/requests";
import {Identifier} from "../../models/typings/INode";
import {Bot} from "../../models/typings/Bot";
import {User} from "../../models/User";


export type UsersBots = {
    id : Identifier,
    login : string,
    bots? : Bot[]
}

export interface IUserBotsState {
    userBots : UsersBots[]
}

const initialState: IUserBotsState = {
    userBots : []
}


export const retrieveBotsByUserId = createAsyncThunk<{userId : Identifier, bots : Bot[]}, Identifier>
('userBots/retrieveBotsByUserId', async (id : Identifier) => {
    const result = await getBotsByUserId(id)
    return {bots : result.data, userId : id}
})


export const retrieveUsers = createAsyncThunk<User[]>
('userBots/retrieveUsers', async () => {
    const result = await getUsers()
    return result.data
})






export const userBotsSlice = createSlice({
    name: 'userBots',
    initialState,
    reducers: {
    },

    extraReducers: builder => {
        builder.addCase(retrieveUsers.fulfilled, (state, {payload}) => {
            state.userBots = payload
        }).addCase(retrieveBotsByUserId.fulfilled, (state, {payload : {userId, bots}}) => {
            let user = state.userBots.find(bot => bot.id == userId)
            if (user) {
                user.bots = bots
            }
        })
    }
})

export const { } = userBotsSlice.actions

export default userBotsSlice.reducer
