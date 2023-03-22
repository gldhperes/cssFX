import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'

import memories from '../../images/memories.png';

import NavMenu from './NavMenu';

import useStyle from './styles'

const Header = ({ logout, user}) => {
    const classes = useStyle()
   

    return (
        <AppBar className={`${classes.appBar} ${classes.flex}`} position="static" color="inherit">
            <div className={classes.flex}>
                <img className={classes.image} src={memories} alt="icon" />

                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    CSS-FX
                </Typography>
            </div>

            <Toolbar className={classes.toolbar}>
                {user ? (

                    <div className={`${classes.profile} ${classes.flex}`}>

                        <NavMenu user={user} logout={logout} />

                    </div>



                ) : (
                    <div className={`${classes.flex} ${classes.userSection}`}>
                        <Button component={Link} to="/auth" variant="contained" color="primary">
                            Log In
                        </Button>

                        <Button component={Link} to="/auth" variant="contained" color="primary">
                            Sign Up
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header

