import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
// import ChipInput from 'material-ui-chip-input';

// IMPORTS TESTE DO HEADER
import decode from 'jwt-decode'
import { LOGOUT } from '../../constants/actionTypes'

// import { getPostsBySearch } from '../../actions/posts'
import Pagination from "../Pagination"
import FavoritePosts from "../Posts/FavoritePosts";
import MostLikeds from "../Posts/MostLikeds";
import Header from "../Header/Header";
import SearchSection from "./SearchSection";
import CategorySection from "./CategorySection";
import UserPostsSection from "./UserPostsSection"

import { getFavoritePosts, getUserPosts } from "../../actions/user";

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

    const [currentId, setCurrentId] = useState(null)
    const searchQuery = query.get('searchQuery')
    const page = query.get('page') || 1
    const [tags, setTags] = useState([])
    // const [route, setRoute] = useState(null)
    // const [search, setSearch] = useState("")

    // CONSTANTES PARA O USUARIO
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // console.log( "USER: ", user );

    const userLogged = useSelector((state) => state.auth.authData);

    function logout() {
        dispatch({ type: LOGOUT })
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
                    logout()
                }
            }

        }
    }, [userLogged]) // eslint-disable-line react-hooks/exhaustive-deps


    const userPath = (`/user/${user?.result?._id}`);
    const isFavoriteRoute = location.pathname.match(`${userPath}/favoritePosts`);
    const isMostLikedsRoute = location.pathname.match('/posts');
    const isUserPostsRoute = location.pathname.match(`${userPath}/userPosts`)
    let route = ''
    // if (isFavoriteRoute) setRoute(isFavoriteRoute) 
    // if (isMostLikedsRoute) setRoute(isMostLikedsRoute)
    // if (isUserPostsRoute) setRoute(isUserPostsRoute)
    if (isFavoriteRoute) route = isFavoriteRoute
    if (isMostLikedsRoute) route = isMostLikedsRoute
    if (isUserPostsRoute) route = isUserPostsRoute


    console.log(`ROTA NA HOME: ${location.pathname}`);
    console.log(`route: ${route}`);
    // if (route) console.log(`ROTA NA HOME: ${route}`);
    // const handleAdd = (tag) => setTags([...tags, tag]);

    // const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);

    return (
        <>
            <Header logout={logout} user={user} setUser={setUser} setTags={setTags} />

            <CategorySection user={user} />

            <SearchSection />

            <Grow in>
                <Container maxWidth='xl'>
                    <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            {/* {currentPath === '/posts' ? <Posts setCurrentId={setCurrentId} /> : <FavoritePosts setCurrentId={setCurrentId} />} */}
                            {/* {currentPath === `/user/:userId/favoritePosts` && <FavoritePosts />} */}

                            {/* <Posts setCurrentId={setCurrentId} /> */}

                            {/* {isFavoriteRoute ? <FavoritePosts setCurrentId={setCurrentId} /> : <Posts setCurrentId={setCurrentId} />} */}

                            {
                                isFavoriteRoute && (
                                    dispatch( getFavoritePosts(user.result._id) ),
                                    <FavoritePosts setCurrentId={setCurrentId} />
                                )
                            }

                            {
                                isMostLikedsRoute && (
                                    dispatch( getFavoritePosts(user.result._id) ),
                                    <MostLikeds setCurrentId={setCurrentId} />
                                )
                            }

                            {
                                isUserPostsRoute && (
                                    dispatch(getUserPosts(user.result._id)),
                                    <UserPostsSection currentId={currentId} setCurrentId={setCurrentId} />
                                )
                            }
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            {/* <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField
                                    name="earch"
                                    variant="outlined"
                                    label="Search"
                                    onKeyPress={handleKeyPress}
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />

                                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" >
                                    Search
                                </Button>
                            </AppBar> */}





                            {/* SE NAO TIVERMOS UMA PESQUISA OU TAG ENTAO RENDERIZA A PAGINAÇÃO */}
                            {(!searchQuery && !tags.length) && (

                                <Paper className={classes.pagination} elevation={6}>

                                    <Pagination page={page} />

                                </Paper>
                            )}

                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>

    )

}

export default Home