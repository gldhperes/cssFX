import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// IMPORTS TESTE DO HEADER
import decode from 'jwt-decode'


import CategorySection from "./CategorySection.jsx";


import { logout } from "../../actions/auth.js";



// import useStyles from './styles.js';

// function useQuery() {
//     return new URLSearchParams(useLocation().search)
// }

const Home = () => {
    // const classes = useStyles();

    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const query = useQuery()
    // const searchQuery = query.get('searchQuery')

    // const [currentId, setCurrentId] = useState(null)
    // const [tags, setTags] = useState([])

    // CONSTANTES PARA O USUARIO
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const userLogged = useSelector((state) => state.auth.authData);

    const logoutUser = () => {
        dispatch(logout())
        setUser(null)
        navigate('/')
    }

    useEffect(() => {

        if (userLogged && !user) {

            const token = userLogged?.token
            // console.log( `token: ${token}`);

            setUser(JSON.parse(localStorage.getItem('profile')))

            // Json Web Token..
            if (token) {

                const decodedToken = decode(token)

                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    logoutUser()
                }
            }

        }

    }, [userLogged]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <CategorySection user={user} />
        </>

    )

}

export default Home