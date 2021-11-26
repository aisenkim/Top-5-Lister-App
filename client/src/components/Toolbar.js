import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import {IconButton, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import {GlobalStoreContext} from "../store";

// FOR FONTSIZE OF ICON
const FONTSIZE = 50;

const MenuToolbar = (props) => {
    const {store} = useContext(GlobalStoreContext);

    const handleHomeLists = async () => {
        // props.setToolMenu("home")
        await store.loadIdNamePairs("home");
    }

    const handleAllLists = async () => {
        // props.setToolMenu("all")
        await store.loadIdNamePairs("all");
    }

    const handleUsersLists = async () => {
        // props.setToolMenu("users")
        await store.loadIdNamePairs("users");
    }

    function handleUpdateText(event) {
        // props.setText(event.target.value);
        store.setSearchBarText(event.target.value)
    }

    return (
        <div id="toolbar-container">
            <IconButton onClick={handleHomeLists} color="inherit">
                <HomeRoundedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton onClick={handleAllLists} color="inherit">
                <GroupsOutlinedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton onClick={handleUsersLists} color="inherit">
                <PersonOutlinedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton color="inherit">
                <FunctionsRoundedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <TextField id="filled-basic" label="Search" variant="filled" style={{width: '100%', background: 'rgb(243, 246, 249)', borderRadius: '10px', textDecoration: 'none'}}
                       onChange={handleUpdateText}/>
            <div id="sort-section">
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    fontWeight='bold'
                    marginBottom='15px'
                    sx={{display: {xs: 'none', sm: 'block', fontSize: '20pt'}}}
                >
                    Sort By
                </Typography>
                <IconButton color='inherit'>
                    <SortRoundedIcon style={{fontSize: FONTSIZE}}/>
                </IconButton>
            </div>
        </div>
    );

}

export default MenuToolbar;
