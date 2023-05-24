import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, InputAdornment } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts'
import useStyle from './styles'

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../colorTheme';
import Pagination from "../Pagination"

const SearchSection = ({ searchQuery, page }) => {
    const classes = useStyle()
    const dispatch = useDispatch();
    const navigate = useNavigate()
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

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags([tags.filter((tag) => tag !== tagToDelete)]);

    return (
        <div className={`${classes.searchSection} ${classes.flex}`}>

            <div className={`${classes.searchArea} ${classes.flex}`}>
                <ThemeProvider theme={theme}>
                    <TextField
                        id="outlined-search"

                        color="primary"

                        InputProps={{

                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ color: "white" }} />
                                </InputAdornment>
                            ),
                        }}

                        inputProps={theme.primary}

                        type="search"
                        value={search}

                        placeholder="Search"
                        name="Search"
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Search"
                        variant="outlined"

                    />


                    <ChipInput
                        color={theme.primary}
                        defaultValue={[]}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label="Search Tags"
                        variant="outlined"
                    />
                </ThemeProvider>

                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" >
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