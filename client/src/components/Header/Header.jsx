import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Toolbar, Button, AppBar, Container } from '@mui/material'
import StreamIcon from '@mui/icons-material/Stream';

import memories from '../../images/memories.png';

import NavMenu from "./NavMenu.jsx";

import useStyle from './styles.js'

import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/auth.js";
import { useNavigate } from "react-router-dom";
import { auth } from '../../constants/routes.js';

const customBtn = {
    width: "120px",
    padding: "15px 20px",

    fontWeight: 'bold',
    backgroundColor: 'white',
}

const Header = ({ user, updateUser }) => {
    const classes = useStyle()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogged = useSelector((state) => user);


    const logoutUser = () => {
        dispatch(logout())

        updateUser(null)

        navigate('/')
    }


    return (
        <AppBar position="static">
            <Container maxWidth="xl" className={`${classes.AppBarContainer} ${classes.flex}`}>
                <div className={`${classes.flex} ${classes.appBar}`}>
                    {/* <img className={classes.image} src={memories} alt="icon" /> */}
                    <StreamIcon fontSize='large' />

                    <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">
                        CSS-FX
                    </Typography>
                </div>

                <Toolbar className={classes.toolbar}>

                    {/* BOTOES DE LOGIN OU SIGNUP */}
                    {userLogged ? (

                        <div className={`${classes.profile} ${classes.flex}`}>

                            <NavMenu user={user} logout={logoutUser} />

                        </div>

                    ) : (
                        <div className={`${classes.flex} ${classes.userSection}`}>
                            <Button
                                color='secundary'
                                sx={customBtn}
                                component={Link} to={auth} variant="contained">
                                Log In
                            </Button>

                            <Button
                                color='secundary'
                                sx={customBtn}
                                component={Link} to={auth} variant="contained">
                                Sign Up
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header

