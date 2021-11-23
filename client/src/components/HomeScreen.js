import React, {useContext, useEffect} from 'react'
import {GlobalStoreContext} from '../store'
import ListCard from './ListCard.js'
import {Fab, Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import AuthContext from "../auth";
import MenuToolbar from "./Toolbar";
import {styled} from "@mui/system";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let listCard = "";
    if (store) {
        listCard =
            <List sx={{width: '90%', left: '5%', bgcolor: '#e6e6e6'}} >
                {
                    // only show list that the user owns
                    store.idNamePairs.filter((pair) => pair.ownerEmail === auth.user.email).map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-header-section">
            {/*TODO - create toolbar component to display toolbar*/}
            <MenuToolbar/>
            {/*<div id="list-selector-heading">*/}
            {/*    <Fab*/}
            {/*        color="primary"*/}
            {/*        aria-label="add"*/}
            {/*        id="add-list-button"*/}
            {/*        onClick={handleCreateNewList}*/}
            {/*    >*/}
            {/*        <AddIcon/>*/}
            {/*    </Fab>*/}
            {/*    <Typography variant="h2">Your Lists</Typography>*/}
            {/*</div>*/}
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;