import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, Typography } from '@material-ui/core'
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';

import { getFavoritePosts, getUserPosts } from "../../actions/user"
import { FAVORITES, USER_POSTS, FOLLOWING, PROFILE, LOGOUT } from "../../constants/pagesTypes.js";

import useStyle from './styles'

const NavMenu = ({ user, logout }) => {
    // MENU SETTINGS
    const classes = useStyle()
    const settings = [PROFILE, USER_POSTS, FAVORITES, FOLLOWING, LOGOUT];

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);



    const handlers = {
       
        'Profile': () => {
            console.log('Profile clicked');
            // TODO: Implement Profile handler
        },

        'My Posts': () => {
            dispatch( getUserPosts(user.result._id) )
            navigate(`/user/${user.result._id}/userPosts`)
        },

        Favorites: () => {
            dispatch( getFavoritePosts(user.result._id) )
            navigate(`/user/${user.result._id}/favoritePosts`)
        },

        Following: () => {

        },

        Logout: () => {
            logout()
            console.log('Logout clicked');
            // TODO: Implement Logout handler
        },
    };


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = (event, option) => {

        if (handlers[option]) {
            handlers[option]();
        }
        setAnchorElUser(null);
    };

    return (
        <>
            <Typography className={classes.userName} variante="h6">
                {user.result.name}
            </Typography>
            
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                </IconButton>

            </Tooltip>

            <Menu 
                classes={{ paper: classes.navMenu }}
                sx={{ 
                    mt: '45px',
                   
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem className={classes.navMenu} key={setting} onClick={(event) => handleCloseUserMenu(event, setting)}>
                        <Typography textalign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default NavMenu