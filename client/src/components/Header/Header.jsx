import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button, ThemeProvider } from '@mui/material'

import memories from '../../images/memories.png';

import NavMenu from "./NavMenu.jsx";

import useStyle from './styles.js'
import theme from '../../colorTheme.js';


import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/auth.js";
import { useNavigate } from "react-router-dom";
import decode from 'jwt-decode'

const Header = ({ updateUser }) => {
    const classes = useStyle()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // CONSTANTES PARA O USUARIO
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const userLogged = useSelector((state) => state.auth.authData);

    const logoutUser = () => {
        dispatch(logout())
        setUser(null)
        updateUser(null)
        navigate('/')
    }

    useEffect(() => {

        if (userLogged && !user) {

            const token = userLogged?.token
            // console.log( `token: ${token}`);

            setUser(JSON.parse(localStorage.getItem('profile')))
            updateUser(JSON.parse(localStorage.getItem('profile')))

            // Json Web Token..
            if (token) {

                const decodedToken = decode(token)

                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    logoutUser()
                }
            }

        }

    }, [userLogged]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        // <ThemeProvider theme={theme}>
            <div className={`${classes.appBar} ${classes.flex}`}>
                <div className={classes.flex}>
                    <img className={classes.image} src={memories} alt="icon" />

                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                        CSS-FX
                    </Typography>
                </div>

                <Toolbar className={classes.toolbar}>

                    {/* BOTOES DE LOGIN OU SIGNUP */}
                    {user ? (

                        <div className={`${classes.profile} ${classes.flex}`}>

                            <NavMenu user={user} logout={logoutUser} />

                        </div>



                    ) : (
                        <div className={`${classes.flex} ${classes.userSection}`}>
                            <Button className={classes.navbarButton} component={Link} to="/auth" variant="contained">
                                Log In
                            </Button>

                            <Button className={classes.navbarButton} component={Link} to="/auth" variant="contained">
                                Sign Up
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </div>
        // </ThemeProvider>
    )
}

export default Header

