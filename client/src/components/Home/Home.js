import React, { useState, useEffect } from "react";
import { Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
// import ChipInput from 'material-ui-chip-input';

// IMPORTS TESTE DO HEADER
import decode from 'jwt-decode'

// import { getPostsBySearch } from '../../actions/posts'
// import Pagination from "../Pagination"
import MostLikeds from "../Posts/MostLikeds";
import FavoritePosts from "../Posts/FavoritePosts";
import Following from "../Posts/Following"
import Header from "../Header/Header";
import SearchSection from "./SearchSection";
import CategorySection from "./CategorySection";
import UserPostsSection from "./UserPostsSection"

import { logout } from "../../actions/auth.js"; 
import { getPosts } from "../../actions/posts";
import { getFavoritePosts, getUserPosts, getFollowing } from "../../actions/user";
import { favorites, mostLikeds, myPosts, following } from "../../constants/routes";


import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const query = useQuery()
    const searchQuery = query.get('searchQuery')
    const page = query.get('page') || 1

    const [currentId, setCurrentId] = useState(null)
    const [tags, setTags] = useState([])
    // const [route, setRoute] = useState(null)
    // const [search, setSearch] = useState("")

    // CONSTANTES PARA O USUARIO
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // console.log( "USER: ", user );

    const userLogged = useSelector((state) => state.auth.authData);

    

    const logoutUser = () => {
        dispatch( logout() )
        setUser(null)
        navigate('/')
    }

    useEffect(() => {    

        if (userLogged && !user) {

            const token = userLogged?.token
            // console.log( `token: ${token}`);

            setUser(JSON.parse(localStorage.getItem('profile')))

            // Json Web Token..
            if (token) {

                const decodedToken = decode(token)

                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    logoutUser()
                }
            }

        }

    }, [userLogged]) // eslint-disable-line react-hooks/exhaustive-deps

    const isMostLikedsRoute = location.pathname.match(mostLikeds);
    const isFavoriteRoute = location.pathname.match(favorites);
    const isFollowingRoute = location.pathname.match(following)
    const isUserPostsRoute = location.pathname.match(myPosts)
    let route = ''

    if (isMostLikedsRoute) route = isMostLikedsRoute
    if (isFavoriteRoute) route = isFavoriteRoute
    if (isFollowingRoute) route = isFollowingRoute
    if (isUserPostsRoute) route = isUserPostsRoute


    console.log(`ROTA NA HOME: ${location.pathname}`);
    console.log(`route: ${route}`);
    // console.log(`user: ${user}`);
    // if (route) console.log(`ROTA NA HOME: ${route}`);
    // const handleAdd = (tag) => setTags([...tags, tag]);

    // const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);

    return (
        <>
            <Header logoutUser={logoutUser} user={user} setUser={setUser} setTags={setTags} />

            <CategorySection user={user} />

            <SearchSection searchQuery={searchQuery} page={page} />

            <div className={`${classes.flex} ${classes.mainContainer}`}>
                <div className={`${classes.flex} ${classes.postsContainer}`}>
                    {/* {currentPath === '/posts' ? <Posts setCurrentId={setCurrentId} /> : <FavoritePosts setCurrentId={setCurrentId} />} */}
                    {/* {currentPath === `/user/:userId/favoritePosts` && <FavoritePosts />} */}

                    {/* <Posts setCurrentId={setCurrentId} /> */}

                    {/* {isFavoriteRoute ? <FavoritePosts setCurrentId={setCurrentId} /> : <Posts setCurrentId={setCurrentId} />} */}

                    {
                        isFavoriteRoute && (
                            user && (dispatch(getFavoritePosts(user.result._id))),
                            <FavoritePosts />

                        )
                    }

                    {
                        isMostLikedsRoute && (
                            user && (
                                dispatch(getFavoritePosts(user.result._id)),
                                dispatch(getPosts(page))

                            ),
                            <MostLikeds />
                        )
                    }

                    {
                        isFollowingRoute && (
                            user && ( 
                                console.log("DISPARANDO GETFOLLOWING"),
                                dispatch( getFollowing(user.result._id)) 
                            ),
                            <Following />
                        )
                    }

                    {
                        isUserPostsRoute && (
                            user && (dispatch(getUserPosts(user.result._id))),
                            <UserPostsSection currentId={currentId} setCurrentId={setCurrentId} />
                        )
                    }
                </div>


                {/* <Paper>
                    SE NAO TIVERMOS UMA PESQUISA OU TAG ENTAO RENDERIZA A PAGINAÇÃO
                    {(!searchQuery && !tags.length) && (

                        <Paper className={classes.pagination} elevation={6}>

                            <Pagination page={page} />

                        </Paper>
                    )}
                </Paper> */}

            </div>
        </>

    )

}

export default Home