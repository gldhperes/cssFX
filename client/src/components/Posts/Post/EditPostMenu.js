import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete'


import useStyle from './styles'
import { deletePost, getPost } from '../../../actions/posts';
import { updatePost } from '../../../constants/routes';

const EditPostMenu = ({ id }) => {
    // MENU SETTINGS
    const classes = useStyle()
    const EDIT = 'Edit'
    const DELETE = 'delete'
    const settings = [EDIT, DELETE];

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);


    const handlers = {

        [[EDIT]]: () => {
            dispatch(getPost(id))
            navigate(`${updatePost}/${id}`)
        },

        [[DELETE]]: () => {
            dispatch(deletePost(id))
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
            <MoreHorizRoundedIcon onClick={handleOpenUserMenu} sx={{ p: 0 }} />

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
                    <MenuItem className={classes.navMenuItem} key={setting} onClick={(event) => handleCloseUserMenu(event, setting)}>
                        {(setting === DELETE) ?
                            (
                                <DeleteIcon />
                            )
                            :
                            (
                                <EditRoundedIcon />
                            )
                        }

                        <Typography textalign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default EditPostMenu