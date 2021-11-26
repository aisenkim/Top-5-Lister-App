import {useContext, useEffect, useState} from 'react'
import {GlobalStoreContext} from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {Alert, CardContent, Collapse} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ModalUnstyled from "@mui/core/ModalUnstyled";
import Typography from "@mui/material/Typography";
import {styled} from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Top5ItemList from "./Top5ItemList";
import CommentSection from "./CommentSection";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AuthContext from "../auth";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
*/
const GridItem = styled(Grid)`
  padding-top: 8px !important;
`;

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

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function ListCard(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const {idNamePair} = props;
    const [open, setOpen] = useState(false);

    // FOR EXPANDING EACH CARD
    const [expanded, setExpanded] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [currentComments, setCurrentComments] = useState([]);

    const handleExpandClick = async (event, id) => {
        // SET IT AS CURRENT LIST
        // await store.setCurrentListComments(id)
        const responseComments = await store.getListCommentsById(id)
        setCurrentComments(responseComments);
        // store.setCurrentList(id).then(() => setExpanded(!expanded));
        // await store.setCurrentList(id)
        const responseList = await store.findListById(id);
        setCurrentList(responseList)
        setExpanded(!expanded)
    };

    useEffect(() => {
        console.log("Insdie useEffect: ", expanded);
        setExpanded(false)
    }, []);


    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        // Need to set error messag state to null so that modal doesn't open again
        // auth.setErrorMessageNull();
    }

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            // store.setCurrentList(id);
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

    function handleEditList() {
        store.setCurrentList(idNamePair._id)
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
                fontSize: '18pt',
                width: '100%',
                backgroundColor: '#fff3e0',
                borderRadius: '20px'
            }}
        >
            <Grid container spacing={2}>
                <GridItem item xs={9}>
                    <Box sx={{p: 1, flexGrow: 1, fontWeight: 'bold'}}>{idNamePair.name}</Box>
                    <Box sx={{p: 1, flexGrow: 1, fontSize: '10pt', fontWeight: 'bold', paddingTop: '0px'}}>
                        By: {idNamePair.ownerName}
                    </Box>
                </GridItem>
                <GridItem item xs={1}>
                    <IconButton onClick={handleToggleEdit} aria-label='like'>
                        <ThumbUpIcon style={{fontSize: '24pt'}}/>
                    </IconButton>
                    <Typography variant='p' style={{fontSize: '24pt'}}>8M</Typography>
                </GridItem>
                <GridItem item xs={1}>
                    <IconButton onClick={(event) => {
                        setOpen(true)
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='dislike'>
                        <ThumbDownIcon style={{fontSize: '24pt'}}/>
                    </IconButton>
                    <Typography variant='p' style={{fontSize: '24pt'}}>8M</Typography>
                </GridItem>
                <GridItem item xs={1}>
                    <IconButton onClick={(event) => {
                        setOpen(true)
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteForeverRoundedIcon style={{fontSize: '32pt'}}/>
                    </IconButton>
                </GridItem>
                <GridItem item xs={12} style={{paddingTop: '0px'}}>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <GridItem container spacing={2}>
                            <GridItem item xs={6} sx={{height: '320px'}}>
                                <Top5ItemList id={idNamePair._id} currentList={currentList}/>
                            </GridItem>
                            <Grid item xs={6} sx={{height: '320px'}}>
                                <CommentSection listId={idNamePair._id} currentComments={currentComments} setCurrentComments={setCurrentComments}/>
                            </Grid>
                        </GridItem>
                    </Collapse>
                </GridItem>
                <GridItem item xs={9}>
                    {idNamePair.published ?
                        <Typography variant='p'
                                    style={{fontSize: '12pt', fontWeight: 'bold', paddingLeft: '10px'}}>
                            {idNamePair.updatedAt}
                        </Typography>
                        :
                        <Typography variant='p' onClick={handleEditList}
                                    style={{fontSize: '12pt', fontWeight: 'bold', paddingLeft: '10px'}}>
                            Edit
                        </Typography>
                    }
                </GridItem>
                <GridItem item xs={2}>
                    <Typography variant='p'
                                style={{fontSize: '12pt', fontWeight: 'bold', paddingLeft: '5px'}}>Views:<span
                        style={{color: 'red'}}>432,342</span></Typography>
                </GridItem>
                <GridItem item xs={1}>
                    <ExpandMore
                        expand={expanded}
                        // onClick={handleExpandClick}
                        onClick={(event) => {
                            handleExpandClick(event, idNamePair._id)
                        }}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{paddingLeft: '20px'}}
                    >
                        <ArrowDownwardSharpIcon/>
                    </ExpandMore>
                </GridItem>
            </Grid>
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