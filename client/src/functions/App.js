import React, { useEffect, useState } from "react";
import { Container, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { auth, userRoute, search, recentPosts, createPost, updatePost, favorites, following, profile, likeds, searchPosts, searchUsers } from '../constants/routes.js'

import Home from "../components/Home/Home.jsx";
import Auth from "../components/Auth/Auth.jsx";
import PostDetails from "../components/PostDetails/PostDetails.jsx"
import CreateAPost from "../components/CodeViewer/CreateAPost.jsx";
import UpdateUserPost from "../components/CodeViewer/UpdateUserPost.jsx";

import Header from "../components/Header/Header.jsx";
import RecentPosts from "../components/Posts/RecentPosts.jsx";
import FavoritePosts from "../components/Posts/FavoritePosts.jsx";
import UsersCards from "../components/UsersCard/FollowingUsers.jsx";
import LikedsPosts from "../components/Posts/LikedsPosts.jsx";
import UserProfile from "../components/UserProfile/UserProfile.jsx"

import SearchedPosts from "../components/Posts/SearchedPosts.jsx";
import SearchedUsers from "../components/Posts/SearchedUsers.jsx";
import SearchSection from "../components/Home/SearchSection.jsx";

import theme from "../theme.js";
import { useSelector } from "react-redux";


const App = () => {

    const userFromRedux = useSelector((state) => state.auth.authData); // Obtém o usuário do Redux
    const [user, setUser] = useState(() => {
        // Inicializa o estado com o valor do localStorage
        const localUser = localStorage.getItem("profile");
        return localUser ? JSON.parse(localUser) : null;
    });

    
    const updateUser = (newUser) => {
        setUser(newUser); // Função para atualizar User
        console.log("NEW USER on APP", newUser);
    };
    
    useEffect(() => {
        console.log("user", user);
        
        // Atualiza o estado para usar o Redux se não houver usuário no localStorage
        if (!user && userFromRedux) {
            setUser(userFromRedux);
        }
    }, [user, userFromRedux]);


return (
    <ThemeProvider theme={theme}>

        <BrowserRouter>
            <Header user={user} updateUser={updateUser} />
            <Home user={user} />
            <SearchSection />

            <Container maxWidth="false" disableGutters={true}>
                <Routes>
                    <Route path="/" element={<RecentPosts />} />

                    <Route path={`${recentPosts}/:id`} element={<PostDetails />} />

                    <Route path={`${searchPosts}`} element={<SearchedPosts />} />

                    <Route path={`${searchUsers}`} element={<SearchedUsers />} />

                    <Route path={`${favorites}`} exact element={<FavoritePosts userID={user?.result?._id} />} />

                    <Route path={`${likeds}`} exact element={<LikedsPosts userID={user?.result?._id} />} />

                    <Route path={`${following}`} exact element={<UsersCards userID={user?.result?._id} />} />

                    <Route path={`${createPost}`} exact element={<CreateAPost />} />

                    <Route path={`${updatePost}/:id`} exact element={<UpdateUserPost />} />

                    <Route path={`${profile}`} exact element={<UserProfile />} />

                    <Route path={`${userRoute}${search}`} element={<RecentPosts />} />

                    <Route path={`${auth}`} exact element={!user ? <Auth /> : <Navigate to="/" />} />
                </Routes>
            </Container>
        </BrowserRouter>
    </ThemeProvider>
)
}

export default App;