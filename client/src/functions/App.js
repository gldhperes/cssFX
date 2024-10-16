import React, { useEffect, useState } from "react";
import { Container, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from "../components/Home/Home.jsx";
import Auth from "../Auth/Auth.jsx";
import PostDetails from "../components/PostDetails/PostDetails.jsx"
import Update_Post from "../components/Code Viewer/Update_Post.jsx";
import Create_Post from "../components/Code Viewer/Create_Post.jsx";

import { auth, userRoute, search, recentPosts, createPost, updatePost, favorites, following, profile, likeds } from '../constants/routes.js'

import Header from "../components/Header/Header.jsx";
import RecentPosts from "../components/Posts/RecentPosts.jsx";
import FavoritePosts from "../components/Posts/FavoritePosts.jsx";
import UsersCards from "../components/Posts/UsersCards.jsx";
import LikedsPosts from "../components/Posts/LikedsPosts.jsx";
import UserProfile from "../components/UserProfile/UserProfile.jsx";

import theme from "../colorTheme.js";

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const updateUser = (newUser) => {
        setUser(newUser); // Função para atualizar User
        console.log(newUser);

    };


    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header updateUser={updateUser} />
                <Home />

                <Container maxWidth="xl" disableGutters={true}>
                    <Routes>
                        <Route path="/" exact element={<Navigate to={recentPosts} />} />

                        <Route path={recentPosts} element={<RecentPosts />} />
                        <Route path={`${recentPosts}/:id`} element={<PostDetails />} />

                        <Route path={favorites} exact element={<FavoritePosts userID={user?.result?._id} />} />

                        <Route path={likeds} exact element={<LikedsPosts userID={user?.result?._id} />} />

                        <Route path={following} exact element={<UsersCards userID={user?.result?._id}  />} />


                        <Route path={createPost} exact element={<Create_Post />} />

                        <Route path={`${updatePost}/:id`} exact element={<Update_Post />} />

                        <Route path={profile} exact element={<UserProfile />} />

                        <Route path={`${userRoute}${search}`} exact element={<Home />} />

                        <Route path={auth} exact element={!user ? <Auth /> : <Navigate to="/" />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;