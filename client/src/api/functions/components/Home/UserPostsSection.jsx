import React from 'react'
import { useSelector } from 'react-redux'

import { CREATE_A_POST } from "../../constants/pagesTypes";

import Form from '../Form/Form'
import Posts from '../Posts/Posts'

const UserPostsSection = ( {currentId, setCurrentId} ) => {
    const posts = useSelector((state) => state.user.userPosts)

    return (
        <>
            {/* <Posts posts={posts} category={CREATE_A_POST} setCurrentId={setCurrentId} /> */}

            <Form currentId={currentId} setCurrentId={setCurrentId} />
        </>

    )
}

export default UserPostsSection