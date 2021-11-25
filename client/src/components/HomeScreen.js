import React, {useContext, useEffect, useState} from 'react'
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
    // SEARCH TEXT INSIDE TOOLBAR
    const [searchText, setSearchText] = useState("");
    // SET CURRENT TOOLBAR BUTTON (HOME, ALL, USERS, COMMUNITY)
    const [toolMenu, setToolMenu] = useState("home");

    useEffect(() => {
        if (auth.user) {
            store.loadIdNamePairs(toolMenu); // GETTING LISTPAIRS FOR HOME MENU
        } else {
            store.loadIdNamePairs("community"); // TODO - change this to getting community list
        }
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let listCard = "";
    if (store) {
        listCard =
            <List sx={{width: '90%', left: '5%', bgcolor: '#e6e6e6'}}>
                {
                    // ONLY SHOW LIST OWNED BY USER
                    // ONLY SHOW LIST THAT INCLUDES SEARCH TEXT
                    store.idNamePairs
                        .filter((pair) => {
                            if (toolMenu === "home")
                                return pair.ownerEmail === auth.user.email && pair.name.toLowerCase().includes(searchText.toLowerCase());
                            else if (toolMenu === "all")
                                return pair.name.toLowerCase().includes(searchText.toLowerCase());
                            else
                                return pair.ownerName.toLowerCase().includes(searchText.toLowerCase());
                        })
                        .map((pair) => (
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
            <MenuToolbar setText={setSearchText} setToolMenu={setToolMenu}/>
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