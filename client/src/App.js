import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Register from "./components/Register";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./apis/user";
import Profile from "./components/Profile";
import AdminPanel from "./components/Admin/AdminPanel";
import Err404 from "./components/404";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const isAdmin = useSelector(state => state.user.currentUser.isAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    return (
        <BrowserRouter>
            {!isAuth && <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Err404 />}/>
            </Routes>}
            {isAuth && <Routes>
                <Route path="/me" element={<Profile />} />
                {isAuth && isAdmin && <Route path="/admin" element={<AdminPanel />} />}
                <Route path="*" element={<Err404 />}/>
            </Routes>}
        </BrowserRouter>
    );
}

export default App;
