import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

// IMPORTS TESTE DO HEADER
import decode from 'jwt-decode'

// import { getPostsBySearch } from '../../actions/posts'
// import Pagination from "../Pagination"
import RecentPosts from "../Posts/RecentPosts";
import FavoritePosts from "../Posts/FavoritePosts";
import UsersCards from "../Posts/UsersCards";
import LikedsPosts from "../Posts/LikedsPosts";
import Header from "../Header/Header";
import SearchSection from "./SearchSection";
import CategorySection from "./CategorySection";
import UserProfile from "../UserProfile/UserProfile";
import Form from "../Form/Form";

import { logout } from "../../actions/auth.js";
import { getPosts } from "../../actions/posts";
import { getFavoritePosts, getFollowing, getLikedsPosts } from "../../actions/user";
import { search, favorites, recentPosts, createPost, updatePost, following, profile, likeds, userRoute } from "../../constants/routes";


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

    const [currentId, setCurrentId] = useState(null)
    const [tags, setTags] = useState([])

    // CONSTANTES PARA O USUARIO
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const userLogged = useSelector((state) => state.auth.authData);

    // console.log("query: ", query);
    // console.log("searchQuery: ", searchQuery);

    const logoutUser = () => {
        dispatch(logout())
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

    const isPostsRoute = location.pathname.match(recentPosts)
    const isFavoriteRoute = location.pathname.match(favorites)
    const isLikedsRoute = location.pathname.match(likeds);
    const isFollowingRoute = location.pathname.match(following)
    const isCreatePostRoute = location.pathname.match(createPost)
    const isUpdatePostRoute = location.pathname.match(updatePost)


    const isSearchUserRoute = location.pathname.startsWith(`${userRoute}${search}`)
    const isProfile = location.pathname.match(profile)

    let route = ''

    if (isPostsRoute) route = isPostsRoute
    if (isFavoriteRoute) route = isFavoriteRoute
    if (isFollowingRoute) route = isFollowingRoute
    if (isLikedsRoute) route = isLikedsRoute
    if (isCreatePostRoute) route = isCreatePostRoute
    if (isUpdatePostRoute) route = isUpdatePostRoute

    if (isSearchUserRoute) route = isSearchUserRoute
    if (isProfile) route = isProfile


    console.log(`ROTA NA HOME: ${location.pathname}`);
    console.log(`route: ${route}`);
    // console.log(`user: ${user}`);
    // if (route) console.log(`ROTA NA HOME: ${route}`);
    // const handleAdd = (tag) => setTags([...tags, tag]);

    // const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);

    return (
        <>
            <Header logout={logoutUser} user={user} setUser={setUser} setTags={setTags} />

            <CategorySection user={user} />

            <SearchSection searchQuery={searchQuery} />

            <div className={`${classes.flex} ${classes.mainContainer}`}>

                {/* {currentPath === '/posts' ? <Posts setCurrentId={setCurrentId} /> : <FavoritePosts setCurrentId={setCurrentId} />} */}
                {/* {currentPath === `/user/:userId/favoritePosts` && <FavoritePosts />} */}

                {/* <Posts setCurrentId={setCurrentId} /> */}

                {/* {isFavoriteRoute ? <FavoritePosts setCurrentId={setCurrentId} /> : <Posts setCurrentId={setCurrentId} />} */}

                {
                    (isPostsRoute) &&
                    (
                        // se houver usuario
                        dispatch(getPosts()),

                        (user) ? (
                            dispatch(getLikedsPosts(user.result._id)),
                            dispatch(getFavoritePosts(user.result._id)),
                            dispatch(getFollowing(user.result._id)),

                            // Se houver pesquisa
                            (query) ? (
                                // dispatch(getFavoritePosts(user.result._id)),
                                // dispatch(getFollowing(user.result._id)),
                                <RecentPosts user={user} />
                            ) : (
                                // dispatch(getPosts()),
                                <RecentPosts user={user} />
                            )


                        ) : (
                            (query) && (
                                <RecentPosts user={user} />
                            )
                        )


                    )
                }

                {
                    (isFavoriteRoute && user) &&

                    (
                        dispatch(getFavoritePosts(user.result._id)),

                        <FavoritePosts />
                    )
                }

                {
                    (isLikedsRoute && user) &&

                    (
                        dispatch(getLikedsPosts(user.result._id)),

                        <LikedsPosts />
                    )
                }


                {
                    (isFollowingRoute && user) &&

                    (
                        console.log("DISPARANDO GETFOLLOWING"),
                        dispatch(getFollowing(user.result._id)),

                        < UsersCards />
                    )
                }

                {
                    (isCreatePostRoute && user) &&

                    (
                        <Form />
                    )
                }

                {
                    (isUpdatePostRoute && user) &&

                    (
                        <Form />
                    )
                }

                {
                    (isSearchUserRoute) && (

                        < UsersCards />
                    )

                }


                {
                    (isProfile && user) &&

                    (
                        <UserProfile />
                    )
                }



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