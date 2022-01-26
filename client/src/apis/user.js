import axios from "axios";
import { login, getUsers, setError } from "../slices/userSlice";
import {removeUser} from "../slices/teamSlice";

export const loginApi = (username, password, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
            username,
            password
        });
        localStorage.setItem('token', response.data.token);
        dispatch(login(response.data));
        callback(response.data, null);
        // console.log(response.data.user)
    } catch (err) {
        dispatch(setError(err.response.data.message));
        callback(null, err.response.data.message)
        // console.log(err.response.data)
    }
}

export const register = (teamName, email, username, password, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/register', {
            team: teamName,
            email,
            username,
            password
        });
        callback(response.data, null);
        // console.log(response.data.message)
    } catch (err) {
        callback(null, err.response.data.message);
        dispatch(setError(err.response.data.message));
        // console.log(err.response.data)
    }
}

export const auth = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:8000/api/auth/auth', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(login(response.data));
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        // console.log(error.response.data);
        localStorage.removeItem('token');
    }
}

export const getUsersApi = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:8000/api/auth/get_users');
        // console.log(response.data)
        dispatch(getUsers(response.data.users));
    } catch (err) {
        // console.log(err.response)
    }
}

export const deleteUserApi = (id) => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/auth/${id}`);
        dispatch(removeUser(response.data.teams));
        console.log(response.data)
    } catch (err) {
        // console.log(err.response)
        dispatch(setError(err.response.data.message));
    }
}