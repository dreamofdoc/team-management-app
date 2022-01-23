import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {addUserToTeamApi, removeUserFromTeamApi, updateTeamApi} from "../../apis/team";
import {useDispatch, useSelector} from "react-redux";
import {getUsersApi} from "../../apis/user";
import { setError } from '../../slices/teamSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateTeamModal = ({ team }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [teamName, setTeamName] = useState('');
    const [newUser, setNewUser] = useState('');
    const [maxNum, setMaxNum] = useState(team.maxNumMembers);

    const users = useSelector(state => state.user.users);
    const error = useSelector(state => state.team.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersApi());
    }, [dispatch]);

    return (
        <div>
            <Button
                size="small"
                color="secondary"
                onClick={handleOpen}
            >
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Team
                    </Typography>
                    {error && <p className="error-message">{error}</p>}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField value={teamName} onChange={(e) => setTeamName(e.target.value)} id="outlined-basic" label="Team Name" variant="outlined" />
                    </Typography><br/>
                    <FormControl style={{minWidth: 120}}>
                        <InputLabel id="demo-simple-select-label">Members</InputLabel>
                        <Select
                            defaultValue=""
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Members"
                            onChange={(e) => {
                                setNewUser(e.target.value)
                            }}
                        >
                            {users.map((user, index) => (
                                <MenuItem
                                    value={user.username}
                                    key={index}
                                >
                                    {user.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl><br/><br/>
                    <TextField
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        value={maxNum}
                        onChange={(e) => {
                            e.preventDefault();
                            setMaxNum(Number(e.target.value));
                        }}
                    /><br/><br/>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(updateTeamApi(team._id, teamName, maxNum, (data, err) => {
                                if (!err) {
                                    dispatch(setError(''));
                                    setTeamName('');
                                    setMaxNum('');
                                    handleClose();
                                }
                            }));
                        }
                        }
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(addUserToTeamApi(newUser, team.name, (data, err) => {
                                if (!err) {
                                    dispatch(setError(''));
                                    setTeamName('');
                                    setMaxNum('');
                                    handleClose();
                                }
                            }));
                        }}
                    >
                        Add User
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeUserFromTeamApi(newUser, team.name, (data, err) => {
                                if (!err) {
                                    dispatch(setError(''));
                                    setTeamName('');
                                    setMaxNum('');
                                    handleClose();
                                }
                            }));
                        }}
                    >
                        Remove User
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdateTeamModal;