import Comment from "./Comment";
import {List, Popover, TextField} from "@mui/material";

import {styled} from '@mui/system';
import Box from "@mui/material/Box";
import {useContext, useEffect, useState} from "react";
import {GlobalStoreContext} from "../store";
import Typography from "@mui/material/Typography";
import AuthContext from "../auth";

const StyledInputElement = styled('input')`
  width: 80%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 7px 10px;
  margin-left: 15px;
  color: #20262d;

`;
const StyledTextInput = styled(TextField)`
  color: #20262d;
  background: rgb(243, 246, 249);
  border-radius: 10px;
  border: 1px solid #e5e8ec;
  width: 100%;
`;

const CommentBox = styled(Box)`
  left: 0%;
  top: 0%;
  width: 100%;
  height: 270px;
  //display: flex;
  //flex-direction: column;
  overflow: scroll;
  border-radius: 10px;
`;

function CommentSection(props) {
    const {store} = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        loadComment();
    }, []);

    async function loadComment() {
        const responseComments = await store.getListCommentsById(props.listId)
        props.setCurrentComments(responseComments);
    }

    async function handleKeyPress(event) {
        // CHECK IF LIST IS PUBLISHED
        if(!props.isPublished){
            setAnchorEl(event.currentTarget);
            return;
        }

        if (event.code === "Enter") {
            await store.createComment(props.listId, text)
            loadComment();
            setText("")
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <div id='comment-selector-list'>
                <List sx={{width: '100%', height: '100%'}}>
                    {props.currentComments.slice(0).reverse().map((comment, idx) => (
                       <Comment key={idx} comment={comment}/>
                     ))}
                </List>
            </div>
            {
                auth.isGuest ?
                    <StyledTextInput label="Comment" onKeyPress={handleKeyPress} onChange={handleUpdateText} value={text} disabled/>
                    :
                    <StyledTextInput label="Comment" onKeyPress={handleKeyPress} onChange={handleUpdateText} value={text} />
            }
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            >
            <Typography sx={{ p: 2 }}>Cannot write comments before publishing.</Typography>
        </Popover>
        </>
    )
}

export default CommentSection;