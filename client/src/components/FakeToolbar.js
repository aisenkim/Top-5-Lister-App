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

    return (
        <div id="toolbar-container">
            <IconButton disabled color="inherit">
                <HomeRoundedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>

            <IconButton disabled color="inherit">
                <GroupsOutlinedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton disabled color="inherit">
                <PersonOutlinedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton disabled color="inherit">
                <FunctionsRoundedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <TextField disabled label="Search" style={{
                width: '100%',
                background: 'rgb(243, 246, 249)',
                borderRadius: '10px',
                textDecoration: 'none',
                margin: 'normal'
            }}
            />
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
                            disabled>
                    <SortRoundedIcon style={{fontSize: FONTSIZE}}/>
                </IconButton>
            </div>
        </div>
    );

}

export default MenuToolbar;
