import React, {useEffect, useState} from 'react';
import {register} from "../apis/user";
import {useDispatch, useSelector} from "react-redux";
import {getTeamsApi} from "../apis/team";
import {Button, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {setError} from "../slices/userSlice";

const Register = () => {
    const [teamName, setTeamName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { error } = useSelector(state => state.user);
    const teams = useSelector(state => state.team.teams);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTeamsApi());
    }, [dispatch]);

    return (
        <div className="landing-register-box">
            <h2 className="landing-register-header">Create an Account</h2>
            <div className="landing-register-form">
                <h4>Available teams to join are: </h4>
                <ol>{teams.map((team, index) => (
                    <li key={index}>{team.name} </li>
                ))}</ol>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={async (e) => {
                    e.preventDefault()
                    await dispatch(register(teamName, email, username, password, (user, err) => {
                        if (err) {
                            navigate('/register');
                        } else {
                            navigate('/login');
                            dispatch(setError(''));
                        }
                    }));
                }}>
                    <TextField
                        style={{width: '350px'}}
                        label="Team Name"
                        variant="standard"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                    />
                    <TextField
                        style={{width: '350px'}}
                        label="Email"
                        type="email"
                        variant="standard"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        style={{width: '350px'}}
                        label="Username"
                        variant="standard"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        style={{width: '350px'}}
                        label="Password"
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    /><br/><br/>
                    <Button
                        variant="contained"
                        size="small"
                        type="submit"
                    >
                        Register
                    </Button>   or <Link to="/login">login</Link>
                </form>
            </div>
        </div>
    );
};

export default Register;