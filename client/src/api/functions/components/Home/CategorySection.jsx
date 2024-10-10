import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Paper, Button } from '@mui/material';

import { FAVORITES, FOLLOWING, LIKEDS, POSTS } from '../../constants/pagesTypes.js'
import { favorites, recentPosts, likeds, following, auth } from '../../constants/routes.js';


import useStyle from './styles.js'

const CategorySection = ({ user }) => {
    const classes = useStyle()
    const navigate = useNavigate()

    const categorys = [POSTS, FAVORITES, LIKEDS, FOLLOWING ];

    const handlers = {

        "Posts": () => {
            navigate(recentPosts)
        },
        
        Favorites: () => {
            if( !user ){

                navigate(auth)
                return         
               
            }

            navigate(favorites)
        },

        Likeds: () => {
            if( !user ){
                navigate(auth)
                return
            }

            navigate(likeds)
        },



        Following: () => {
            if( !user ){
                navigate(auth)
                return
            }

            navigate(following)
        },
       
    };

    const handlerCallCategory = (event, option) => {

        if ( handlers[option] ) {
            handlers[option]();
        }

    };


    return (
        <Paper className={`${classes.categorySection} ${classes.flex}`}>
            {
                categorys.map((cat)=>(
                    <Button className={classes.categoryBtn} key={cat} onClick={(event) => handlerCallCategory(event, cat)}>
                        {cat}
                    </Button>
                ))
            }
        </Paper>
    )
}

export default CategorySection