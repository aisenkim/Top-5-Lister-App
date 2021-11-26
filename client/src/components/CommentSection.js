import Comment from "./Comment";
import {List, TextField} from "@mui/material";

import {styled} from '@mui/system';
import Box from "@mui/material/Box";
import {useContext, useState} from "react";
import {GlobalStoreContext} from "../store";

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
    const [text, setText] = useState("");

    async function handleKeyPress(event) {
        if (event.code === "Enter") {
            await store.createComment(props.listId, text)
            const responseComments = await store.getListCommentsById(props.listId)
            props.setCurrentComments(responseComments);
            setText("")
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    return (
        <>
            <div id='comment-selector-list'>
                <List sx={{width: '100%', height: '100%'}}>
                    {props.currentComments.map((comment, idx) => (
                       <Comment key={idx} comment={comment}/>
                     ))}
                    {/*<Comment id={1}/>*/}
                    {/*<Comment id={2}/>*/}
                    {/*<Comment id={3}/>*/}
                    {/*<Comment id={4}/>*/}
                    {/*<Comment id={5}/>*/}
                </List>
                {/*<StyledInputElement aria-label="Demo input" placeholder="Type something..." />*/}
            </div>
            <StyledTextInput label="Comment" onKeyPress={handleKeyPress} onChange={handleUpdateText} value={text}/>
        </>
    )
}

export default CommentSection;