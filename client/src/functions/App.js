import React from "react";
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from "../components/Home/Home.js";
import Auth from "../Auth/Auth.js";
import PostDetails from "../components/PostDetails/PostDetails.jsx"
import { auth, userRoute, search, recentPosts, createPost, updatePost, favorites, following, profile, likeds } from '../constants/routes.js'

import { ThemeProvider } from '@mui/styles';
import theme from '../colorTheme.js';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxWidth="xl" disableGutters={true}>

                    <Routes>
                        <Route path={recentPosts} exact element={<Home />} />
                        <Route path="/" exact element={<Navigate to='/posts' />} />
                        <Route path={`${recentPosts}/:id`} element={<PostDetails />} />

                        <Route path={`${recentPosts}${search}`} exact element={<Home />} />

                        <Route path={favorites} exact element={<Home />} />
                        <Route path={following} exact element={<Home />} />
                        <Route path={likeds} exact element={<Home />} />
                        <Route path={createPost} exact element={<Home />} />
                        <Route path={updatePost} exact element={<Home />} />
                        <Route path={profile} exact element={<Home />} />
                        <Route path={`${userRoute}${search}`} exact element={<Home />} />

                        <Route path={auth} exact element={!user ? <Auth /> : <Navigate to="/" />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;