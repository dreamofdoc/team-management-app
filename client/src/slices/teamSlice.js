import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teams: [],
    error: ''
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        getTeams: (state, action) => {
            state.teams = action.payload.teams
        },
        addTeam: (state, action) => {
            state.teams = [...state.teams, action.payload.team]
        },
        deleteTeam: (state, action) => {
            state.teams = state.teams.filter(team => team._id !== action.payload.team._id)
        },
        updateTeam: (state, action) => {
            state.teams = state.teams.map(team => team._id === action.payload.team._id ? action.payload.team : team)
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        addUser: (state, action) => {
            state.teams = action.payload
        },
        removeUser: (state, action) => {
            state.teams = action.payload
        }
    }
})

export const { getTeams, addTeam, deleteTeam, updateTeam, setError, addUser, removeUser } = teamSlice.actions
export default teamSlice.reducer