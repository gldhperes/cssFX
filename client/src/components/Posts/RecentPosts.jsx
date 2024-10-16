import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getPosts } from "../../actions/posts.js";

import Posts from "./Posts";
import SearchSection from "../Home/SearchSection.jsx";

import { POSTS } from "../../constants/pagesTypes";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const RecentPosts = () => {

    const dispatch = useDispatch()

    // const favoritedPosts = useSelector((state) =>
    // se tiver usuario logado entao
    // user && state.user.favoritedPosts
    // );

    const query = useQuery()
    const searchQuery = query.get('searchQuery')

    const favoritedPosts = null

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    const { posts } = useSelector((state) => state.posts)

    return (
        <>
            <SearchSection searchQuery={searchQuery} />

            {
                (posts || favoritedPosts) && (
                    <Posts posts={posts} favPosts={favoritedPosts} category={POSTS} />
                )
            }
        </>
    )
}

export default RecentPosts;