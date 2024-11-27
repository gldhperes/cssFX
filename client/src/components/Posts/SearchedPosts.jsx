import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Posts from './Posts'
import { POSTS } from '../../constants/pagesTypes.js'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SearchedPosts = () => {

    const { posts } = useSelector((state) => state.posts)
    console.log("posts", posts);


    const query = useQuery()
    const searchQuery = query.get('searchQuery')
    
    return (
        <>
            {
                (posts && searchQuery) && (
                    <Posts posts={posts} category={POSTS} />
                )
            }
        </>
    )
}

export default SearchedPosts