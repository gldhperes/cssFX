import React from "react"

import { useSelector } from "react-redux";

import Posts from "./Posts";

import { POSTS } from "../../constants/pagesTypes";


const RecentPosts = ({ user }) => {

    const favoritedPosts = useSelector((state) =>
        // se tiver usuario logado entao
        user && state.user.favoritedPosts
    );

    const { posts } = useSelector((state) => state.posts)

    // console.log(`posts: ${posts}`);

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