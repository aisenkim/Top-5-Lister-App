import React, {useContext, useEffect, useState} from 'react'
import {GlobalStoreContext} from '../store'
import ListCard from './ListCard.js'
import {Fab, Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import AuthContext from "../auth";
import MenuToolbar from "./Toolbar";
import {styled} from "@mui/system";
import {Statusbar} from "./index";
import Top5Item from "./Top5Item";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext)
    // // SEARCH TEXT INSIDE TOOLBAR
    // const [searchText, setSearchText] = useState("");
    // // SET CURRENT TOOLBAR BUTTON (HOME, ALL, USERS, COMMUNITY)
    // const [toolMenu, setToolMenu] = useState("home");

    useEffect(() => {
        if (auth.user) {
            store.loadIdNamePairs(store.toolMenu); // GETTING LISTPAIRS FOR HOME MENU
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
            <List sx={{width: '90%', left: '5%', bgcolor: '#bdbdbd'}}>
                {
                    // ONLY SHOW LIST OWNED BY USER
                    // ONLY SHOW LIST THAT INCLUDES SEARCH TEXT
                    store.idNamePairs
                        .filter((pair) => {
                            if (store.toolMenu === "home")
                                return pair.ownerEmail === auth.user.email && pair.name.toLowerCase().includes(store.searchText.toLowerCase());
                            else if (store.toolMenu === "all")
                                return pair.name.toLowerCase().includes(store.searchText.toLowerCase());
                            else
                                return pair.ownerName.toLowerCase().includes(store.searchText.toLowerCase());
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

    // let editCard = "";
    // if (store.currentList) {
    //     editCard =
    //         <List id="edit-items" sx={{width: '100%', bgcolor: 'background.paper'}}>
    //             {
    //                 store.currentList.items.map((item, index) => (
    //                     <Top5Item
    //                         key={'top5-item-' + (index + 1)}
    //                         text={item}
    //                         index={index}
    //                     />
    //                 ))
    //             }
    //         </List>;
    // }

    return (
        <>
            <div id="top5-header-section">
                {/*<MenuToolbar setText={setSearchText} setToolMenu={setToolMenu}/>*/}
                <div id="list-selector-list">
                    {
                        listCard
                    }
                </div>
            </div>
            {/*<Statusbar/>*/}
        </>
    )
}

export default HomeScreen;