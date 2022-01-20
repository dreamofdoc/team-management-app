import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginApi } from "../apis/user";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { setError } from '../slices/userSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(loginApi(username, password, (user, err) => {
                    if (!user) {
                        navigate('/login')
                    } else if (!user.user.isAdmin) {
                        navigate('/me')
                        dispatch(setError(''))
                    } else {
                        navigate('/admin')
                        dispatch(setError(''))
                    }
                }));
            }}>
                <TextField
                    style={{ width: '350px' }}
                    label="Username"
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <TextField
                    style={{ width: '350px' }}
                    label="Password"
                    type="password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
                <Button
                    variant="contained"
                    size="small"
                    type="submit"
                >
                    Log In
                </Button>
            </form>
        </div>
    );
};

export default Login;