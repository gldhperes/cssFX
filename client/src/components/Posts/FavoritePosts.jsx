import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";

import Posts from "./Posts";

import { FAVORITES } from "../../constants/pagesTypes";
import { getFavoritePosts } from "../../actions/user.js";   

const FavoritePosts = ({ userID }) => {

    const dispatch = useDispatch()

    const favoritedPosts = useSelector((state) => state.user.favoritedPosts);

    useEffect(() => {
        dispatch(getFavoritePosts(userID))
    }, [dispatch])


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