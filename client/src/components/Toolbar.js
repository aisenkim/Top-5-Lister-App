import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import {IconButton, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import {GlobalStoreContext} from "../store";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AuthContext from "../auth";

// FOR FONTSIZE OF ICON
const FONTSIZE = 50;

const MenuToolbar = (props) => {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    const handleHomeLists = async () => {
        // props.setToolMenu("home")
        await store.loadIdNamePairs("home", "-createdAt");
    }

    const handleAllLists = async () => {
        // props.setToolMenu("all")
        await store.loadIdNamePairs("all", "-createdAt");
    }

    const handleUsersLists = async () => {
        // props.setToolMenu("users")
        await store.loadIdNamePairs("users", "-createdAt");
    }

    const handleCommunityLists = async () => {
        await store.getCommunityLists("community", "-createdAt");
    }

    function handleUpdateText(event) {
        // props.setText(event.target.value);
        store.setSearchBarText(event.target.value)
    }

    // FOR SORT MENU
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // CALL SORTED LIST TO SERVER AND CLOSE MENU
    const handleCloseMenu = async (event) => {
        const {myValue} = event.currentTarget.dataset;
        if(store.toolMenu === "community") {
           await store.getCommunityLists("community", myValue)
        } else {
            await store.loadIdNamePairs(store.toolMenu, myValue)
        }
        setAnchorEl(null);
    };

    // SIMPLY CLOSE MENU
    const handleClose = async (event) => {
        setAnchorEl(null);
    };

    return (
        <div id="toolbar-container">
            {
                auth.isGuest ?
                    <IconButton onClick={handleHomeLists} color="inherit" disabled>
                        <HomeRoundedIcon style={{fontSize: FONTSIZE}}/>
                    </IconButton>
                    :
                    <IconButton onClick={handleHomeLists} color="inherit">
                        <HomeRoundedIcon style={{fontSize: FONTSIZE}}/>
                    </IconButton>

            }
            <IconButton onClick={handleAllLists} color="inherit">
                <GroupsOutlinedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton onClick={handleUsersLists} color="inherit">
                <PersonOutlinedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton onClick={handleCommunityLists} color="inherit">
                <FunctionsRoundedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <TextField label="Search" style={{
                width: '100%',
                background: 'rgb(243, 246, 249)',
                borderRadius: '10px',
                textDecoration: 'none',
                margin: 'normal'
            }}
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
                <IconButton color='inherit' aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                    <SortRoundedIcon style={{fontSize: FONTSIZE}}/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleCloseMenu} data-my-value="-createdAt">Publish Date (Newest)</MenuItem>
                    <MenuItem onClick={handleCloseMenu} data-my-value="createdAt">Publish Date (Oldest)</MenuItem>
                    <MenuItem onClick={handleCloseMenu} data-my-value="-views">Views</MenuItem>
                    <MenuItem onClick={handleCloseMenu} data-my-value="-like">Likes</MenuItem>
                    <MenuItem onClick={handleCloseMenu} data-my-value="-dislike">Dislikes</MenuItem>
                </Menu>
            </div>
        </div>
    );

}

export default MenuToolbar;
