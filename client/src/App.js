import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { auth, mostLikeds, myPosts, favorites, following } from './constants/routes'

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './colorTheme';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxWidth="xl" disableGutters={true}>

                    <Routes>
                        <Route path="/" exact element={<Navigate to='/posts' />} />
                        <Route path={mostLikeds} exact element={<Home />} />

                        <Route path={`${mostLikeds}/search`} exact element={<Home />} />
                        <Route path={`${mostLikeds}/:id`} element={<PostDetails />} />

                        <Route path={favorites} exact element={<Home />} />
                        <Route path={following} exact element={<Home />} />
                        <Route path={myPosts} exact element={<Home />} />

                        <Route path={auth} exact element={!user ? <Auth /> : <Navigate to="/" />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;