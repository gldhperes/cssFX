import React, { useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts'
import Pagination from "../Pagination"
import Posts from "../Posts/Posts";
import FavoritePosts from "../Posts/FavoritePosts";
import Form from "../Form/Form";
import Navbar from "../Navbar/Navbar";

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const location = useLocation();
    const currentPath = window.location.pathname;
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])

    const searchPost = () => {
        console.log('s: ', search.trim(), ' tags: ', tags);

        if (search.trim() || tags) {
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    const handleKeyPress = (e) => {
        // evento de quando a tecla ENTER for pressionada
        if (e.keyCode === 13) {
            searchPost()
        }
    }
    
    const isFavoriteRoute = location.pathname.startsWith('/user/') && location.pathname.endsWith('/favoritePosts');
       
    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);

    return (
        <>
            <Navbar isFavoriteRoute={isFavoriteRoute} />

            <Grow in>
                <Container maxWidth='xl'>
                    <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            {/* {currentPath === '/posts' ? <Posts setCurrentId={setCurrentId} /> : <FavoritePosts setCurrentId={setCurrentId} />} */}
                            {/* {currentPath === `/user/:userId/favoritePosts` && <FavoritePosts />} */}

                            {/* <Posts setCurrentId={setCurrentId} /> */}

                            {isFavoriteRoute ? <FavoritePosts setCurrentId={setCurrentId} /> : <Posts setCurrentId={setCurrentId} />}
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
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
                            </AppBar>

                            <Form currentId={currentId} setCurrentId={setCurrentId} />

                            {/* SE NAO TIVERMOS UM PESQUISA OU TAG ENTAO RENDERIZA A PAGINAÇÃO */}
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