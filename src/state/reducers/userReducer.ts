import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Credentials, postLogin, postRegister, putPassword} from "../../api/requests";
import {Role} from "../../models/Role";

export interface IUserState {
    login? : string,
    roles? : Role[],
    token? : string
    registerErrors? : string[],
    loginErrors? : string[],
}

const initialState: IUserState = {}


export const login = createAsyncThunk<IUserState, Credentials>
('user/login', async (credentials : Credentials, thunkApi) => {

    const result = await postLogin(credentials)

    return result.data
})

export const changePassword = createAsyncThunk<IUserState, Omit<Credentials, "login"> & {newPassword : string}>
('user/changePassword', async (credentials : Omit<Credentials, "login"> & {newPassword : string}, api) => {

    const result = await putPassword(credentials)

    return result.data
})

export const register = createAsyncThunk<IUserState, Credentials>
('user/register', async (credentials : Credentials, thunkApi) => {

    const result = await postRegister(credentials)

    return result.data
})



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.login = undefined
            state.token = undefined
            state.roles = undefined
            state.registerErrors = undefined
            state.loginErrors = undefined
        },
    },

    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.login = payload.login
            state.roles = payload.roles
            state.token = payload.token

            if (!payload.token) {
                state.loginErrors = ["Invalid credentials provided"]
            }
            else {
                state.loginErrors = undefined
                state.registerErrors = undefined
            }
        }).addCase(register.fulfilled, (state, {payload}) => {
            state.login = payload.login
            state.roles = payload.roles
            state.token = payload.token

            if (!payload.token) {
                state.registerErrors = ["Invalid credentials provided"]
            }
            else {
                state.loginErrors = undefined
                state.registerErrors = undefined
            }
        }).addCase(changePassword.fulfilled, (state, {payload}) => {
            state.login = payload.login
            state.roles = payload.roles
            state.token = payload.token

            if (!payload.token) {
                state.registerErrors = ["Invalid credentials provided"]
            }
            else {
                state.loginErrors = undefined
                state.registerErrors = undefined
            }
        })
    }
})

export const {logout} = userSlice.actions

export default userSlice.reducer
