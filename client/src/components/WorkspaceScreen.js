import {useContext} from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import {ListItem, TextField, Typography} from '@mui/material'
import {GlobalStoreContext} from '../store/index.js'
import {styled} from "@mui/system";
import Top5ItemList from "./Top5ItemList";
import Grid from "@mui/material/Grid";
import CommentSection from "./CommentSection";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/

const StyledTextInput = styled(TextField)`
  color: #20262d;
  background: rgb(243, 246, 249);
  border-radius: 10px;
  border: 1px solid #e5e8ec;
  width: 40%;
`;

const GridContainer = styled(Grid)`
  //left: 0%;
  //top: 10%;
  //width: 100%;
  //height: 80%;
  //background: #669966;
`

function WorkspaceScreen() {
    const {store} = useContext(GlobalStoreContext);

    let editItems = "";
    if (store.currentList) {
        editItems =
            <List id="edit-items" sx={{width: '100%', bgcolor: 'background.paper'}}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item
                            key={'top5-item-' + (index + 1)}
                            text={item}
                            index={index}
                        />
                    ))
                }
            </List>;
    }
    return (

        <List sx={{width: '90%', left: '5%', bgcolor: '#e6e6e6'}}>
            {
                store.currentList.items.map((item, index) => (
                    <Top5Item
                        key={'top5-item-' + (index + 1)}
                        text={item}
                        index={index}
                    />
                ))
            }
        </List>
        // <div id="top5-workspace">
        //     <StyledTextInput label="Comment" />
        //     <div id="workspace-edit">
        //         {/*<StyledTextInput label="Comment" onKeyPress={handleKeyPress} onChange={handleUpdateText} value={text}/>*/}
        //         <div id="edit-numbering">
        //             <div className="item-number"><Typography variant="h3">1.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">2.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">3.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">4.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">5.</Typography></div>
        //         </div>
        //         {editItems}
        //     </div>
        // </div>
    )
    // return (
    //     <div id="top5-workspace">
    //         <div id="workspace-edit">
    //             {/*<StyledTextInput label="Comment" onKeyPress={handleKeyPress} onChange={handleUpdateText} value={text}/>*/}
    //             <div id="edit-numbering">
    //                 <div className="item-number"><Typography variant="h3">1.</Typography></div>
    //                 <div className="item-number"><Typography variant="h3">2.</Typography></div>
    //                 <div className="item-number"><Typography variant="h3">3.</Typography></div>
    //                 <div className="item-number"><Typography variant="h3">4.</Typography></div>
    //                 <div className="item-number"><Typography variant="h3">5.</Typography></div>
    //             </div>
    //             {editItems}
    //         </div>
    //     </div>
    // )
}

export default WorkspaceScreen;