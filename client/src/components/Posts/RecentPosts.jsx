import React from "react"

import { useSelector } from "react-redux";

import Posts from "./Posts";

import { POSTS } from "../../constants/pagesTypes";


const RecentPosts = ( ) => {

    const favoritedPosts = useSelector((state) => state.user.favoritedPosts);
    const { posts } = useSelector((state) => state.posts)

    console.log( posts );
    return (
        <>
            {
                (posts || favoritedPosts) && (
                    <Posts posts={posts} favPosts={favoritedPosts} category={POSTS}  />
                )
            }

        </>
    )
}

export default RecentPosts;