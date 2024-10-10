import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';

import { getFavoritePosts, getUserProfile } from "../../actions/user.js"
import { FAVORITES, CREATE_A_POST, FOLLOWING, PROFILE, LOGOUT } from "../../constants/pagesTypes.js";
import { favorites, createPost, following, profile } from '../../constants/routes.js'; 

import { FETCH_POST } from '../../constants/actionTypes.js';

import useStyle from './styles.js'

const NavMenu = ({ user, logout }) => {
    // MENU SETTINGS
    const classes = useStyle()
    const settings = [PROFILE, CREATE_A_POST, FAVORITES, FOLLOWING, LOGOUT];
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const base64Image = 'data:image/png;base64,'+user.result.photo // Substitua com sua string Base64

    const handlers = {
        
        [[PROFILE]]: () => {
            console.log(user.result._id);
            dispatch( getUserProfile(user.result._id) )
            navigate(profile)
        },

        [[CREATE_A_POST]]: () => {
            dispatch( { type: FETCH_POST, payload: null } ) ;
            navigate(createPost)
        },

        [[FAVORITES]]: () => {
            dispatch( getFavoritePosts(user.result._id) )
            navigate(favorites)
        },

        [[FOLLOWING]]: () => {
            navigate(following)
        },

        [[LOGOUT]]: () => {
            console.log('Logout clicked');
            logout()
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

                    <Avatar className={`${classes.flex} ${classes.avatar}`} alt={user.result.name} src={user.result.imageUrl}>
                        {/* {user.result.name.charAt(0)} */}
                        <img className={classes.userImg} src={base64Image} alt="Imagem" />
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