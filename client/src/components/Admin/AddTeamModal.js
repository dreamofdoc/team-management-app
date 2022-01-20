import React, {useState} from 'react';
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTeamApi} from "../../apis/team";
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

const AddTeamModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [teamName, setTeamName] = useState('');
    const [maxNum, setMaxNum] = useState(10);

    const error = useSelector(state => state.team.error);

    const dispatch = useDispatch();

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleOpen}
            >
                Add Team
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Team
                    </Typography>
                    {error && <p className="error-message">{error}</p>}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField value={teamName} onChange={(e) => setTeamName(e.target.value)} id="outlined-basic" label="Team Name" variant="outlined" />
                    </Typography><br/>
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
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(addTeamApi(teamName, maxNum, (data, err) => {
                                if (!err) {
                                    dispatch(setError(''));
                                    setTeamName('');
                                    setMaxNum('');
                                    handleClose();
                                }
                            }));
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AddTeamModal;