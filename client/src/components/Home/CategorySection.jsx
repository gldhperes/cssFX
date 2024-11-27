import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper, Button, ThemeProvider, AppBar } from '@mui/material';

import { FAVORITES, FOLLOWING, LIKEDS, POSTS } from '../../constants/pagesTypes.js'
import { favorites, likeds, following, auth } from '../../constants/routes.js';


import useStyle from './styles.js'
import theme from '../../theme.js';
import { Box } from '@mui/system';

const CategorySection = ({ user }) => {
    const classes = useStyle()
    const navigate = useNavigate()

    const categorys = [POSTS, FAVORITES, LIKEDS, FOLLOWING];

    const handlers = {

        "Posts": () => {
            navigate("/")
        },

        Favorites: () => {
            if (!user) {

                navigate(auth)
                return

            }

            navigate(favorites)
        },

        Likeds: () => {
            if (!user) {
                navigate(auth)
                return
            }

            navigate(likeds)
        },



        Following: () => {
            if (!user) {
                navigate(auth)
                return
            }

            navigate(following)
        },

    };

    const handlerCallCategory = (event, option) => {

        if (handlers[option]) {
            handlers[option]();
        }

    };


    return (

        <AppBar position="static" className={`${classes.categorySection} ${classes.flex}`}>
            <Box className={`${classes.AppBarBox} ${classes.flex}`}>
                {
                    categorys.map((cat) => (
                        <Button variant="contained" disableElevation className={classes.categoryBtn} key={cat} onClick={(event) => handlerCallCategory(event, cat)}>
                            {cat}
                        </Button>
                    ))
                }
            </Box>
        </AppBar>

    )
}

export default CategorySection