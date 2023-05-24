import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { auth, recentPosts, createPost, updatePost, favorites, following, profile, likeds } from './constants/routes'

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
                        <Route path={recentPosts} exact element={<Home />} />

                        <Route path={`${recentPosts}/search`} exact element={<Home />} />
                        <Route path={`${recentPosts}/:id`} element={<PostDetails />} />

                        <Route path={favorites} exact element={<Home />} />
                        <Route path={following} exact element={<Home />} />
                        <Route path={likeds} exact element={<Home />} />
                        <Route path={createPost} exact element={<Home />} />
                        <Route path={updatePost} exact element={<Home />} />
                        <Route path={profile} exact element={<Home />} />

                        <Route path={auth} exact element={!user ? <Auth /> : <Navigate to="/" />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;