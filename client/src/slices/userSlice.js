import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    currentUser: {},
    isAuth: false,
    id: '',
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload.user;
            state.isAuth = true;
            state.id = action.payload.user._id;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.currentUser = {};
            state.isAuth = false;
            state.id = '';
        },
        getUsers: (state, action) => {
            state.users = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
});

export const { login, logout, getUsers, setError } = userSlice.actions;
export default userSlice.reducer