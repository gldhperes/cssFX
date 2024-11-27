import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getPosts } from "../../actions/posts.js";

import Posts from "./Posts";
import SearchSection from "../Home/SearchSection.jsx";

import { POSTS } from "../../constants/pagesTypes";
import useStyle from "./styles.js";


const RecentPosts = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { posts } = useSelector((state) => state.posts)

    // const favoritedPosts = useSelector((state) =>
    // se tiver usuario logado entao
    // user && state.user.favoritedPosts
    // );

    const favoritedPosts = null

    useEffect(() => {
        dispatch(getPosts())
        // navigate(`/`)
    }, [dispatch])

    console.log("posts", posts)

    return (
        <>

            {
                (posts || favoritedPosts) && (
                    <Posts posts={posts} favPosts={favoritedPosts} category={POSTS} />
                )
            }
        </>
    )
}

export default RecentPosts;