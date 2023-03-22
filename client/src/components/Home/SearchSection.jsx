import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts'
import useStyle from './styles'

const SearchSection = () => {
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
            <TextField
                id="outlined-search"
                type="search"
                value={search}
                name="Search"
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
                label="Search"
                variant="outlined"         
            />

            <ChipInput
                defaultValue={[]}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
            />

            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" >
                Search
            </Button>
        </div>
    )
}

export default SearchSection