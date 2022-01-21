import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import NavBar from "./NavBar";

const Profile = () => {
    const [user, setUser] = useState({ team: '', username: '' });
    const userID = useSelector(state => state.user.id);

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/auth/profile/${userID}`);
            setUser(response.data.user);
            console.log(response.data.user);
        } catch (err) {
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="pages-with-nav">
            <NavBar/>
            <div className="profile-desc">
                <div>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj3be0NvJcT_uyHSuHN5t47-D2orRO656BqMwAZnFpc7FpZhc5bbteQPna5I46SuKqe0U&usqp=CAU"
                        alt="User Picture"
                    />
                    <p><b>Team: </b>{user.team.name}</p>
                    <p><b>Hobbies: </b><ul>
                        <li>Football</li>
                        <li>Cybersport</li>
                        <li>Reading</li>
                        <li>Math</li>
                    </ul></p>
                </div>
                <div className="text-section">
                    <h1 className="profile-name">{user.username}</h1>
                    <div>
                        <p className="profile-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <p className="profile-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;