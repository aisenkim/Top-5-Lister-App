import {useContext, useState} from 'react'
import {GlobalStoreContext} from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Alert} from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import {styled} from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertStyle = styled(Alert)`
  font-size: 24px;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};


function ListCard(props) {
    const {store} = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const {idNamePair} = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        // Need to set error messag state to null so that modal doesn't open again
        // auth.setErrorMessageNull();
    }

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    async function deleteMarkedList() {
        await store.deleteMarkedList();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{marginTop: '15px', display: 'flex', p: 1}}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
            <Box sx={{p: 1, flexGrow: 1}}>{idNamePair.name}</Box>
            <Box sx={{p: 1}}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize: '48pt'}}/>
                </IconButton>
            </Box>
            <Box sx={{p: 1}}>
                <IconButton onClick={(event) => {
                    setOpen(true)
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{fontSize: '48pt'}}/>
                </IconButton>
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        <>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style} style={{textAlign: "center"}}>
                    <AlertStyle severity="error">
                        {store.listMarkedForDeletion ? `Delete list: ${store.listMarkedForDeletion.name} ?` : null}
                    </AlertStyle>
                    <Button variant="contained" color="success" onClick={deleteMarkedList}>Yes</Button>
                    <Button variant="contained" color="error" onClick={handleClose}>No</Button>
                </Box>
            </StyledModal>
            {cardElement}
        </>
    );
}

export default ListCard;