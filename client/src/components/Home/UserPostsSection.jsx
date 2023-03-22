import React from 'react'
import { useSelector } from 'react-redux'

import { USER_POSTS } from "../../constants/pagesTypes";

import Form from '../Form/Form'
import Posts from '../Posts/Posts'

const UserPostsSection = ( {currentId, setCurrentId} ) => {
    const posts = useSelector((state) => state.user.userPosts)

    return (
        <>
            <Posts posts={posts} category={USER_POSTS} setCurrentId={setCurrentId} />

            <Form currentId={currentId} setCurrentId={setCurrentId} />
        </>

    )
}

export default UserPostsSection