import {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import AuthContext from '../auth';
import {GlobalStoreContext} from '../store'
import EditToolbar from './EditToolbar'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from "@mui/material/Avatar";
import {blue} from '@mui/material/colors'

export default function AppBanner() {
    const {auth} = useContext(AuthContext);
    const history = useHistory();
    const {store} = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleGuestSignout = () => {
        if(auth.isGuest)
            auth.setGuest(false)
        history.push('/')
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu =
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        // if (store.currentList) {
        //     editToolbar = <EditToolbar/>;
        // }
    }

    function getAccountMenu(loggedIn) {
        return <AccountCircle/>;
    }

    /**
     * Receive user and convert it to initial
     * @param name
     */
    function convertNameToInitials(user) {
        const firstName = user.firstName;
        const lastName = user.lastName;

        const firstLetter = firstName.charAt(0);
        const lastLetter = lastName.charAt(0);

        const initials = firstLetter + "" + lastLetter;

        return {
            sx: {
                bgcolor: blue[500],
            },
            children: initials,
        };
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                        onClick={handleGuestSignout}
                    >
                        <span style={{textDecoration: 'none', color: 'white', cursor: 'pointer'}} >T<sup>5</sup>L</span>
                    </Typography>
                    <Box sx={{flexGrow: 1}}>{editToolbar}</Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {auth.loggedIn ?
                            <Avatar {...convertNameToInitials(auth.user)} onClick={handleProfileMenuOpen}/>
                            :
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {getAccountMenu(auth.loggedIn)}
                            </IconButton>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}