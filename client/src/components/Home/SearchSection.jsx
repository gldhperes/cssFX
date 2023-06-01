import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, InputAdornment } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts'
import { getUsersBySearch } from '../../actions/user'
import useStyle from './styles'

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../colorTheme';
import inputTheme from '../../inputTheme';
import Pagination from "../Pagination"

import { makeStyles } from '@material-ui/core/styles';

const SearchSection = ({ searchQuery, page }) => {
    const classes = useStyle()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchPost, setSearchPost] = useState("")
    const [searchUser, setSearchUser] = useState("")
    const [tags, setTags] = useState([])


    const searchPosts = () => {
        console.log('s: ', searchPost.trim(), ' tags: ', tags);
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
        if (searchPost !== "" && tags !== []) searchPosts()
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

    const useStylesTextField = makeStyles(theme => ({
        root: {
            fontFamily: 'Muli',
            '& .MuiFormLabel-root': {
                // color: 'red',
                fontSize: 12,
                fontFamily: 'Muli',
                transform: 'none',
                top: 17,
                left: 13
            },
            '& .MuiFormLabel-root.Mui-error': {
                color: '#b04995'
            },
            '& input': {
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                // padding: '26px 12px 0',
                // transition: 'padding 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            },
            '& .MuiFormLabel-filled + .MuiInputBase-root input': {
                padding: '35px 12px 14px'
            },
            '& .Mui-focused input': {
                padding: '35px 12px 14px'
            },
            '& .MuiFormHelperText-root.Mui-error': {
                color: 'red',
                fontFamily: 'Muli',
                fontSize: 12
            }
        }
    }));

    const classesTextField = useStylesTextField();

    return (
        <div className={`${classes.searchSection} ${classes.flex}`}>

            <div className={`${classes.searchArea} ${classes.flex}`}>

                <TextField
                    id="outlined-search"
                    // className={classes.textField}
                    classes={classesTextField}
                    color='primary'

                    InputProps={{
                        color: 'white !important',
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


                <ChipInput
                    // color={theme.primary}
                    // defaultValue={[]}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                // variant="outlined"
                />


                <TextField
                    id="outlined-search"

                    // color="primary"

                    classes={classesTextField}

                    InputProps={{

                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}

                    // inputProps={theme.primary}

                    type="Search User"
                    value={searchUser}

                    placeholder="Search User"
                    name="SearchUser"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setSearchUser(e.target.value)}
                    label="Search User"
                    // variant="outlined"

                />

                <Button onClick={Search} className={classes.searchButton} >
                    Search
                </Button>
            </div>


            <Paper>
                {/* SE NAO TIVERMOS UMA PESQUISA OU TAG ENTAO RENDERIZA A PAGINAÇÃO */}
                {(!searchQuery && !tags.length) && (

                    <Paper className={classes.pagination} elevation={4}>

                        <Pagination page={page} />

                    </Paper>
                )}
            </Paper>

        </div>
    )
}

export default SearchSection