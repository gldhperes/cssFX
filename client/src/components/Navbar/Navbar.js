import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode'
import { LOGOUT } from '../../constants/actionTypes'

import useStyle from './styles'
import memories from '../../images/memories.png';

const Navbar = ( { isFavoriteRoute } ) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState( JSON.parse( localStorage.getItem('profile') ) )
    
    const logout = () =>{
        dispatch({ type: LOGOUT })
        setUser(null)
        navigate('/')
    }

    // favoritedPosts vem de Home
    function goTofavoritedPosts () {
        navigate(`/user/${user.result._id}/favoritePosts`)
    }

    useEffect ( () => {
        const token = user?.token

        // Json Web Token..
        if( token ){
            const decodedToken = decode(token)

            if( decodedToken.exp * 1000 < new Date().getTime() ){
                logout()
            }
        }
 
        setUser( JSON.parse( localStorage.getItem('profile') ) )
    }, [location] ) // eslint-disable-line react-hooks/exhaustive-deps

    // // eslint-disable-line react-hooks/exhaustive-deps TEM QUE ESTAR ATIVO PARA TIRAR AS DEPENDENCIAS DO useEffect

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>

                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variante="h6">
                            {user.result.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                            Logout
                        </Button>

                        <Button variant="contained" className={classes.logout} color="secondary" onClick={goTofavoritedPosts}>
                            Favorited Posts
                        </Button>

                    </div>
                ):(
                    <Button component={ Link } to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

