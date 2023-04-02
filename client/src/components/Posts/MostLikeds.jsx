import React from "react"

import { useSelector } from "react-redux";

import Posts from "./Posts";

import { MOST_LIKEDS } from "../../constants/pagesTypes";


const MostLikeds = ( ) => {

    const favoritedPosts = useSelector((state) => state.user.favoritedPosts);
    const { posts } = useSelector((state) => state.posts)

    console.log( posts );
    return (
        <>
            {
                (posts || favoritedPosts) && (
                    <Posts posts={posts} favPosts={favoritedPosts} category={MOST_LIKEDS}  />
                )
            }

        </>
    )
}

export default MostLikeds;