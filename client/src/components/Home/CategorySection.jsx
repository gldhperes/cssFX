import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Paper, Button } from '@material-ui/core';

import { FAVORITES, FOLLOWING, MOST_LIKEDS } from '../../constants/pagesTypes.js'
import { favorites, mostLikeds, following } from '../../constants/routes.js';


import useStyle from './styles'

const CategorySection = ({ user }) => {
    const classes = useStyle()
    const navigate = useNavigate()

    const categorys = [MOST_LIKEDS, FAVORITES, FOLLOWING ];

    const handlers = {

        "Most Likeds": () => {
            console.log('MostLikeds clicked');
            navigate(mostLikeds)
        },
        
        Favorites: () => {
            if( !user ){
                // PAGINA DIZENDO PARA CRIAR UMA CONTA E TER ACESSO
                console.log("Cria uma conta");
                return
            }

            navigate(favorites)
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