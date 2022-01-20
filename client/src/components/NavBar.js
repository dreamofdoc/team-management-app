import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../slices/userSlice";
import {Button} from "@mui/material";

const NavBar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const isAdmin = useSelector(state => state.user.currentUser.isAdmin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <p className="nav-text">Navigation</p>
            {!isAuth && (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )
            }
            {isAuth && (
                <div className="nav-btns">
                    <Link
                        className="logout-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(logout());
                            navigate('/');
                        }}
                        to="/"
                    >
                        Logout
                    </Link><br/><br/>
                    {!isAdmin && <Link
                        className="logout-btn"
                        to="/me"
                    >
                        Profile
                    </Link>}
                </div>
            )}
        </div>
    );
};

export default NavBar;