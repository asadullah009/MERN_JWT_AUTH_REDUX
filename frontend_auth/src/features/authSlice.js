import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice ({
    name : 'auth',
    initialState : { user: null, token: null},
    reducers:{
        setCredentials: (state, action)=>{
            const  { user, accesstoken } = action.payload
            state.user = user
            state.token = accesstoken

        },
        logout: (state , action)=>{
            state.user = null
            state.token = null
        }
    },
})


export const { setCredentials , logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token

