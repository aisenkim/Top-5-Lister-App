import {useContext, useState} from 'react'
import {GlobalStoreContext} from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Alert, CardContent, Collapse} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ModalUnstyled from "@mui/core/ModalUnstyled";
import Typography from "@mui/material/Typography";
import {styled} from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Top5ItemList from "./Top5ItemList";
import CommentSection from "./CommentSection";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

function Comment(props) {
    const {store} = useContext(GlobalStoreContext);
    const {idNamePair} = props;


    let cardElement =
        <ListItem
            // id={idNamePair._id}
            // key={idNamePair._id}
            id-={props.id}
            key={props.id}
            sx={{marginBottom: '5px', display: 'flex', p: 1}}
            button
            style={{
                fontSize: '14pt',
                width: '100%',
                backgroundColor: 'blue',
                borderRadius: '10px'
            }}
        >
            {/*<Box sx={{p: 1, flexGrow: 1}}>Random</Box>*/}
                    {/*<Box sx={{p: 1, flexGrow: 1}}>{idNamePair.name}</Box>*/}
                    <Box sx={{p: 1}}>
                        <Typography variant='h6' style={{fontSize: '14px'}}>
                            hello
                        </Typography>
                        <Typography variant='p' style={{fontSize: '18px'}}>
                            hello
                        </Typography>
                    </Box>
        </ListItem>
    return (
        <>
            {cardElement}
        </>
    );
}

export default Comment;