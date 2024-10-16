import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper, Button, ThemeProvider } from '@mui/material';

import { FAVORITES, FOLLOWING, LIKEDS, POSTS } from '../../constants/pagesTypes.js'
import { favorites, recentPosts, likeds, following, auth } from '../../constants/routes.js';


import useStyle from './styles.js'
import theme from '../../colorTheme.js';

const CategorySection = ({ user }) => {
    const classes = useStyle()
    const navigate = useNavigate()

    const categorys = [POSTS, FAVORITES, LIKEDS, FOLLOWING];

    const handlers = {

        "Posts": () => {
            navigate(recentPosts)
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
        <ThemeProvider theme={theme}>
            <Paper square className={`${classes.categorySection} ${classes.flex}`} sx={{bgcolor:"buttons.dark"}}>
                {
                    categorys.map((cat) => (
                        <Button className={classes.categoryBtn} key={cat} onClick={(event) => handlerCallCategory(event, cat)}>
                            {cat}
                        </Button>
                    ))
                }
            </Paper>
        </ThemeProvider>
    )
}

export default CategorySection