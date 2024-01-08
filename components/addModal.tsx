"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Container, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

interface categoryProps {
    name: string;
    id: string;
}

export default function AddModal() {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const [selectCategory, setSelectCategory] = React.useState<categoryProps | null>(null);
    const [categorys, setCategory] = React.useState<categoryProps[]>([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    React.useEffect(() => {
        axios.get("/api/questions/category")
            .then(e => {
                setCategory(e.data.categroy);
            }).catch(err => {
            })
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        axios.post("api/questions", {
            name: text,
            categories:{
                name: selectCategory?.name
            }
        }).then(() => {
            handleClose();
            alert("Okay")
        }).catch(() => {
            alert("erro ao cadastrar a questão  ")
        })
    }

    return (
        <React.Fragment>
            <IconButton onClick={handleClickOpen} className='absolute top-0 right-0' aria-label="delete" size="large">
                <AddIcon sx={{ color: "#fff" }} fontSize="inherit" />
            </IconButton>            <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
                <DialogTitle>Nova pergunta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adicione perguntas para o joguinho
                    </DialogContentText>
                    <Container>
                        <TextField
                            value={text}
                            onChange={e => setText(e.target.value)}
                            multiline
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="O que você acha de...."
                            type="text"
                            fullWidth
                        />
                        <Autocomplete
                            onChange={(e, v) => setSelectCategory(v)}
                            className='my-2'
                            getOptionLabel={(option) => option.name}
                            options={categorys.sort((a, b) => -b.name.localeCompare(a.name))}
                            renderInput={(params) => <TextField value {...params} label="Categoria" />}
                        >
                        </Autocomplete>

                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button disabled={(text.length < 2 || (!selectCategory))} onClick={handleSubmit}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}