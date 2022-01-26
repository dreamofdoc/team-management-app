import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteTeamApi, getTeamsApi } from "../../apis/team";
import AddTeamModal from "./AddTeamModal";
import UpdateTeamModal from "./UpdateTeamModal";
import NavBar from "../NavBar";
import { getUsersApi } from "../../apis/user";
import {
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

const AdminPanel = () => {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.team.teams);

    useEffect(() => {
        dispatch(getTeamsApi());
        dispatch(getUsersApi());
    }, [dispatch]);

    return (
        <div className="pages-with-nav">
            <NavBar/>
            <div className="admin-table">
                <h1 style={{textAlign: 'center'}}>Adminka</h1>
                <TableContainer sx={{ maxWidth: 750 }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    className="table-headings"
                                    align="center"
                                >
                                    Teams
                                </TableCell>
                                <TableCell
                                    className="table-headings"
                                    align="center"
                                >
                                    Members
                                </TableCell>
                                <TableCell
                                    className="table-headings"
                                    align="center"
                                >
                                    Max Num
                                </TableCell>
                                <TableCell
                                    className="table-headings"
                                    align="center"
                                >
                                    Control Panel
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teams.map((team, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        style={{fontWeight: 'bold'}}
                                        align="center"
                                    >
                                        {team.name}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        {team.users[0] === undefined ? (
                                            <p><i>No users</i></p>
                                        ) : (
                                            <ul>
                                                {team.users.map(user => (
                                                    <li key={user._id}>{user.username}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                    >
                                        {team.maxNumMembers}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="error"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    dispatch(deleteTeamApi(team._id))
                                                }}>
                                                Delete
                                            </Button>
                                            <UpdateTeamModal team={team} />
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer><br/>
                <AddTeamModal />
            </div>
        </div>
    );
};

export default AdminPanel;