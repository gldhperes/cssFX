import React from "react"

import { useSelector } from "react-redux";

import Posts from "./Posts";

import { FAVORITES } from "../../constants/pagesTypes";

const FavoritePosts = ( ) => {
   
    const favoritedPosts = useSelector((state) => state.user.favoritedPosts);

    console.log('FAVORITED');

    return (
        <>
            {
                favoritedPosts && (
                    <Posts posts={favoritedPosts} category={FAVORITES} />
                )
            }
        </>

    )
}

export default FavoritePosts