import axios from "axios";
import {addTeam, getTeams, deleteTeam, updateTeam, setError, addUser, removeUser} from "../slices/teamSlice";

export const getTeamsApi = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:8000/api/teams/get_teams');
        dispatch(getTeams(response.data));
        console.log(response.data)
    } catch (err) {
        console.log(err.response.data)
    }
}

export const addTeamApi = (name, maxNum, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/teams/add_team', {
            name,
            maxNum
        });
        dispatch(addTeam(response.data));
        callback(response.data, null)
    } catch (err) {
        dispatch(setError(err.response.data.message));
        callback(null, err.response.data.message)
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

export const updateTeamApi = (id, name, maxNum, callback) => async dispatch => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/teams/${id}`, {
            name,
            maxNum
        });
        dispatch(updateTeam(response.data));
        callback(response.data, null)
        console.log(response.data)
    } catch (err) {
        dispatch(setError(err.response.data.message))
        callback(null, err.response.data.message)
        console.log(err.response.data)
    }
}

export const addUserToTeamApi = (username, teamName, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/teams/operation/add_user_to_team', {
            username,
            teamName
        });
        dispatch(addUser(response.data.teams));
        callback(response.data, null)
        console.log(response.data.message);
    } catch (err) {
        dispatch(setError(err.response.data.message));
        callback(null, err.response.data.message)
        console.log(err.response.data.message);
    }
}

export const removeUserFromTeamApi = (username, teamName, callback) => async dispatch => {
    try {
        const response = await axios.delete('http://localhost:8000/api/teams/operation/delete_user_from_team', { data: {
                username,
                teamName
            }});
        dispatch(removeUser(response.data.teams));
        callback(response.data, null)
        console.log(response.data.message)
    } catch (err) {
        dispatch(setError(err.response.data.message));
        callback(null, err.response.data.message)
    }
}