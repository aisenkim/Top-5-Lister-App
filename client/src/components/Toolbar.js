import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import {IconButton, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

const MenuToolbar = () => {
    const FONTSIZE = 50;

   const handleHome = (event) => {
       console.log("Home Button Pressed");
   }

    return (
        <div id="toolbar-container">
            <IconButton onClick={handleHome} color="inherit">
                <HomeRoundedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton color="inherit">
                <GroupsOutlinedIcon style={{fontSize: FONTSIZE}} />
            </IconButton>
            <IconButton color="inherit">
                <PersonOutlinedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <IconButton color="inherit">
                <FunctionsRoundedIcon style={{fontSize: FONTSIZE}}/>
            </IconButton>
            <TextField id="filled-basic" label="Search" variant="filled" style={{width : '100%'}} />
            <div id="sort-section">
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    fontWeight='bold'
                    marginBottom='7px'
                    sx={{display: {xs: 'none', sm: 'block'}}}
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
