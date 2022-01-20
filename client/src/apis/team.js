import axios from "axios";
import {addTeam, getTeams, deleteTeam, updateTeam, setError, addUser} from "../slices/teamSlice";

export const getTeamsApi = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:8000/api/teams/get_teams');
        dispatch(getTeams(response.data));
        console.log(response.data)
    } catch (err) {
        console.log(err.response.data)
    }
}

export const addTeamApi = (name, maxNum) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/teams/add_team', {
            name,
            maxNum
        });
        dispatch(addTeam(response.data));
    } catch (err) {
        console.log(err.response.data)
    }
}

export const deleteTeamApi = (id) => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/teams/${id}`);
        dispatch(deleteTeam(response.data))
    } catch (err) {
        console.log(err.response.data)
    }
}

export const updateTeamApi = (id, name, maxNum) => async dispatch => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/teams/${id}`, {
            name,
            maxNum
        });
        dispatch(updateTeam(response.data));
        console.log(response.data)
    } catch (err) {
        console.log(err.response.data)
    }
}

export const addUserToTeamApi = (username, teamName) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/teams/add_user_to_team', {
            username,
            teamName
        });
        dispatch(addUser(response.data.teams));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

export const removeUserFromTeamApi = (username, teamName) => async dispatch => {
    try {
        const response = await axios.delete('http://localhost:8000/api/teams/delete_user_from_team', {
            username,
            teamName
        });
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}