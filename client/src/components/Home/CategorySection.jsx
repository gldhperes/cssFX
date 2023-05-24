import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Paper, Button } from '@material-ui/core';

import { FAVORITES, FOLLOWING, LIKEDS, POSTS } from '../../constants/pagesTypes.js'
import { favorites, recentPosts, likeds, following } from '../../constants/routes.js';


import useStyle from './styles'

const CategorySection = ({ user }) => {
    const classes = useStyle()
    const navigate = useNavigate()

    const categorys = [POSTS, FAVORITES, LIKEDS, FOLLOWING ];

    const handlers = {

        "Posts": () => {
            // console.log('Posts clicked');
            navigate(recentPosts)
        },
        
        Favorites: () => {
            if( !user ){
                // PAGINA DIZENDO PARA CRIAR UMA CONTA E TER ACESSO
                console.log("Cria uma conta");
                return
            }

            navigate(favorites)
        },

        Likeds: () => {
            if( !user ){
                // PAGINA DIZENDO PARA CRIAR UMA CONTA E TER ACESSO
                console.log("Cria uma conta");
                return
            }

            navigate(likeds)
        },



        Following: () => {
            if( !user ){
                // PAGINA DIZENDO PARA CRIAR UMA CONTA E TER ACESSO
                console.log("Cria uma conta");
                return
            }

            console.log('Following clicked');
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