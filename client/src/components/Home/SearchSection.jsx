import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, AppBar, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { getPostsBySearch } from '../../actions/posts'
import { getUsersBySearch } from '../../actions/user'
import { searchPosts, searchUsers } from '../../constants/routes';
import useStyle from './styles'
import { red } from '@mui/material/colors';

// import { ThemeProvider } from '@mui/styles';
// import theme from '../../colorTheme';
// import inputTheme from '../../inputTheme';
// import Pagination from "../Pagination"

// import { makeStyles } from '@mui/styles';


const SearchSection = () => {
    const classes = useStyle()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchPost, setSearchPost] = useState("")
    const [searchUser, setSearchUser] = useState("")
    const [tags, setTags] = useState([])
    // const [tags, setTags] = useState([])


    const Search_Posts = () => {
        console.log('s: ', searchPost.trim());

        // const tagsArray = tags.join(',')
        // console.log(tagsArray);

        if (searchPost.trim() || tags) {
            // dispatch -> fetch search post

            // dispatch(getPostsBySearch({ searchPost: searchPost, tags: tags.join(',') }));
            // navigate(`/search?searchQuery=${searchPost || 'none'}&tags=${tags.join(',')}`)

            dispatch(getPostsBySearch({ searchPost: searchPost }));
            navigate(`${searchPosts}/?searchQuery=${searchPost || 'none'}`)

        } else {
            navigate('/')
        }
    }

    const Search_Users = () => {
        console.log('s: ', searchUser);
        if (searchUser || tags) {
            // dispatch -> fetch search post
            dispatch(getUsersBySearch(searchUser));
            navigate(`${searchUsers}?searchQuery=${searchUser || 'none'}`)
        } else {
            navigate('/')
        }
    }

    const Search = () => {

        if (searchPost !== "" /* && tags !== [] */) Search_Posts()
        // else if (tags) searchPosts()
        else if (searchUser !== "") Search_Users()
    }

    const handleKeyPress = (e) => {
        // evento de quando a tecla ENTER for pressionada
        if (e.keyCode === 13) {
            Search()
        }
    }

    // const handleAdd = (tag) => setTags([...tags, tag]);
    // const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);

    return (
        <AppBar position="static">

            <Container maxWidth="xl" className={`${classes.searchArea} ${classes.flex}`}>

                <TextField
                    id="outlined-search"
                    variant="outlined"
                    label="Search Post"

                    sx={customSx}

                    type="Search Post"
                    value={searchPost}

                    onKeyDown={handleKeyPress}
                    name="SearchPost"
                    placeholder="Search Post"
                    onChange={(e) => setSearchPost(e.target.value)}

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
                    variant="outlined"
                    label="Search User"

                    sx={customSx}

                    type="Search User"
                    value={searchUser}

                    onKeyDown={handleKeyPress}
                    name="SearchUser"
                    placeholder="Search User"
                    onChange={(e) => setSearchUser(e.target.value)}
                />

                <Button
                    onClick={Search}

                    sx={{
                        width: "120px",
                        padding: "15px 20px",

                        color: "#650065",
                        fontWeight: 'bold',
                        backgroundColor: 'white',
                    }}
                >
                    Search
                </Button>
            </Container>


            {/* <Paper> */}
            {/* SE NAO TIVERMOS UMA PESQUISA OU TAG ENTAO RENDERIZA A PAGINAÇÃO */}
            {/* {(!searchQuery && !tags.length) && ( */}

            {/* <Paper className={classes.pagination} elevation={4}> */}

            {/* <Pagination page={page} /> */}

            {/* </Paper> */}
            {/* )} */}
            {/* </Paper> */}

        </AppBar>
    )
}

const customSx = {
    ".MuiInputLabel-root": {
        color: "white",
    },

    ".MuiFormControl-root": {
        backgroundColor: "yellow !important",

        "&.Mui-focused": {
            border: "1px solid white",
        },
    },

    ".MuiOutlinedInput-root": {
        input: {
            color: "white",

            '&:selected fieldset': {
                borderColor: "white",
            },
        },

        fieldset: {
            border: "1px solid white",
        },

        "&.Mui-focused fieldset": {
            border: "1px solid white",
        },

        '&:hover fieldset': {
            borderColor: "white",
        },

        // '&:-webkit-autofill': {

        // },


        // "&:input:-webkit-autofill:focus": {
        //     transition: "background-color 600000s 0s, color 600000s 0s"
        // },

        // "&:input[data-autocompleted]": {
        //     backgroundColor: "transparent !important"
        // },
    },
}

export default SearchSection