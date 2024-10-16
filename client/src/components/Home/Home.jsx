import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

// IMPORTS TESTE DO HEADER
import decode from 'jwt-decode'

// import { getPostsBySearch } from '../../actions/posts'
// import Pagination from "../Pagination"
import RecentPosts from "../Posts/RecentPosts.jsx";
import FavoritePosts from "../Posts/FavoritePosts.jsx";
import UsersCards from "../Posts/UsersCards.jsx";
import LikedsPosts from "../Posts/LikedsPosts.jsx";
// import Header from "../Header/Header.js";
import SearchSection from "./SearchSection.jsx";
import CategorySection from "./CategorySection.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";


import { logout } from "../../actions/auth.js";
import { getPosts } from "../../actions/posts.js";
import { getFavoritePosts, getFollowing, getLikedsPosts } from "../../actions/user.js";
import { search, favorites, recentPosts, createPost, updatePost, following, profile, likeds, userRoute } from "../../constants/routes.js";


import useStyles from './styles.js';

// function useQuery() {
//     return new URLSearchParams(useLocation().search)
// }

const Home = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const query = useQuery()
    // const searchQuery = query.get('searchQuery')

    const [currentId, setCurrentId] = useState(null)
    const [tags, setTags] = useState([])

    // CONSTANTES PARA O USUARIO
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const userLogged = useSelector((state) => state.auth.authData);

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


    return (
        <>
        
            <CategorySection user={user} />

            {/* <div className={`${classes.flex} ${classes.mainContainer}`}>

                {/* {currentPath === '/posts' ? <Posts setCurrentId={setCurrentId} /> : <FavoritePosts setCurrentId={setCurrentId} />} */}
                {/* {currentPath === `/user/:userId/favoritePosts` && <FavoritePosts />} */}

                {/* <Posts setCurrentId={setCurrentId} /> */}

                {/* {isFavoriteRoute ? <FavoritePosts setCurrentId={setCurrentId} /> : <Posts setCurrentId={setCurrentId} />} */}

                {/* {
                    (isPostsRoute) &&
                    (
                        // se houver usuario
                        dispatch(getPosts()),

                        (user) ? (
                            // dispatch(getLikedsPosts(user.result._id)),
                            // dispatch(getFavoritePosts(user.result._id)),
                            // dispatch(getFollowing(user.result._id)),

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
                    (isSearchUserRoute) && (

                        < UsersCards />
                    )

                }


                {
                    (isProfile && user) &&

                    (
                        <UserProfile />
                    )
                } */}



                 {/* <Paper>
                    SE NAO TIVERMOS UMA PESQUISA OU TAG ENTAO RENDERIZA A PAGINAÇÃO
                    {(!searchQuery && !tags.length) && (

                        <Paper className={classes.pagination} elevation={6}>

                            <Pagination page={page} />

                        </Paper>
                    )}
                </Paper>  */}

            {/* </div>  */}
        </>

    )

}

export default Home