import React from "react";

// Import MUI Delete Dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ProjectDeleteDialog({open, setOpen, handler, projectId}) {
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        handler(projectId);
        setOpen(false);
    };
    return (
        <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this Project?!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This Projects may contains tasks.
                This action can't be undoed.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleDelete} autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}