"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");

    React.useEffect(() => {
        const user = localStorage.getItem("user")
        if (!user)
            setOpen(true)
    }, [])

    const handleClose = () => {
        if (!(name.length < 2))
            setOpen(false);
    };

    function createUser() {
        axios.post("/api/user/create", {
            name
        }).then(response => {
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            setOpen(false);
        })
    }

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Bem-vindo ao Cumplicidade Play!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Um jogo de cartas para quebrar o gelo e fortalecer os relacionamentos.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name"
                        label="Nome do casal"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={name.length < 2} onClick={createUser}>Começar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}