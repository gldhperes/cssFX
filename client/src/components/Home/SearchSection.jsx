import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { getPostsBySearch } from '../../actions/posts'
import { getUsersBySearch } from '../../actions/user'
import useStyle from './styles'

// import { ThemeProvider } from '@mui/styles';
// import theme from '../../colorTheme';
// import inputTheme from '../../inputTheme';
// import Pagination from "../Pagination"

// import { makeStyles } from '@mui/styles';

const SearchSection = ({ searchQuery }) => {
    const classes = useStyle()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchPost, setSearchPost] = useState("")
    const [searchUser, setSearchUser] = useState("")
    const [tags, setTags] = useState([])
    // const [tags, setTags] = useState([])


    const searchPosts = () => {
        console.log('s: ', searchPost.trim(), ' tags: ', tags.join(','));
        
        // const tagsArray = tags.join(',')
        // console.log(tagsArray);
        
        if (searchPost.trim() || tags) {
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({ searchPost: searchPost, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${searchPost || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    const searchUsers = () => {
        console.log('s: ', searchUser);
        if (searchUser || tags) {
            // dispatch -> fetch search post
            dispatch(getUsersBySearch(searchUser));
            navigate(`/user/search?searchQuery=${searchUser || 'none'}`)
        } else {
            navigate('/')
        }
    }

    const Search = () => {

        // if (searchPost !== "" && tags !== []) searchPosts()
        if (tags ) searchPosts()
        if (searchUser !== "") searchUsers()
    }

    const handleKeyPress = (e) => {
        // evento de quando a tecla ENTER for pressionada
        if (e.keyCode === 13) {
            Search()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);

    return (
        <div className={`${classes.searchSection} ${classes.flex}`}>

            <div className={`${classes.searchArea} ${classes.flex}`}>

                <TextField
                    id="outlined-search"
                    className={classes.inputComponent}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}

                    // inputProps={theme.primary}

                    type="Search Post"
                    value={searchPost}

                    placeholder="Search Post"
                    name="SearchPost"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setSearchPost(e.target.value)}
                    label="Search Post"
                    variant="outlined"

                />


                {/* <Chip
                    className={classes.inputComponent}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                    variant="outlined"
                /> */}

                <TextField
                    id="outlined-search"

                    className={classes.inputComponent}

                    InputProps={{

                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}

                    type="Search User"
                    value={searchUser}

                    placeholder="Search User"
                    name="SearchUser"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setSearchUser(e.target.value)}
                    label="Search User"
                    variant="outlined"
                />

                <Button onClick={Search} className={classes.searchButton} variant="contained">
                    Search
                </Button>
            </div>


            {/* <Paper> */}
                {/* SE NAO TIVERMOS UMA PESQUISA OU TAG ENTAO RENDERIZA A PAGINAÇÃO */}
                {/* {(!searchQuery && !tags.length) && ( */}

                    {/* <Paper className={classes.pagination} elevation={4}> */}

                        {/* <Pagination page={page} /> */}

                    {/* </Paper> */}
                {/* )} */}
            {/* </Paper> */}

        </div>
    )
}

export default SearchSection