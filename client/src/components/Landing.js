import React from 'react';
import { useSelector} from "react-redux";
import Login from "./Login";
import { Link } from "react-router-dom";

const Landing = () => {
    const { error } = useSelector(state => state.user)

    return (
        <div className="landing-register-box">
            <h2 className="landing-register-header">Welcome to Team Management App</h2>
            <div className="landing-register-form">
                <div>
                    <p>Log In</p>
                    {error && <p className="error-message">{error}</p>}
                    <Login />
                </div>
                <div>
                    <p>or if you do not have account, create one by <Link to="/register">registering</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Landing;