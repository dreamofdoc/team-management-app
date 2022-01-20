import React from 'react';
import { useSelector } from "react-redux";
import Login from "./Login";

const LoginRoute = () => {
    const error = useSelector(state => state.user.error);

    return (
        <div className="landing-register-box">
            <h2 className="landing-register-header">Sign In</h2>
            {error && <p style={{ marginLeft: '60px' }} className="error-message">{error}</p>}
            <div className="landing-register-form">
                <Login />
            </div>
        </div>
    )
}

export default LoginRoute;