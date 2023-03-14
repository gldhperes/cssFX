import React, { useEffect, useState, useCallback } from "react"
import { Grid, CircularProgress, Button } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";

import { getFavoritePosts } from "../../actions/user"
import Posts from "./Posts";
import Post from "./Post/Post";

import useStyles from './styles';

const FavoritePosts = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    
    const favoritedPosts = useSelector( (state) => state.user.favoritedPosts );
    

    const getFavoritedPostsBtn = async() =>{
        dispatch( getFavoritePosts() )
    }
 

    useEffect(() => {
        console.log(favoritedPosts);
    }, [favoritedPosts] ) 

   
    return (
        <>
            <Button variant="contained" color="secondary" onClick={getFavoritedPostsBtn}>
                Favorited Posts
            </Button>
           
        </>

    )
}

export default FavoritePosts