import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { init } from 'next/dist/compiled/@vercel/og/satori'

type initialState = {
    value: valueState,
}

type valueState = {
    isLogedIn: boolean,
    id: string,
    username: string,
    role: string,
    companyId: string,
    employers: object[]
}

const initialState = {
    value: {
        isLogedIn: false,
        _id: "",
        username: "",
        role: "",
        companyId: "",
        employers: "",
    }
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: () => {
            // some func here to make request hope
            // then to set it to the state
            const AuthState = initialState
            return AuthState
        }
    }
})

export const { logIn, logOut } = auth.actions
export default auth.reducer