import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { LIKEDS } from "../../constants/pagesTypes";
import { getLikedsPosts } from "../../actions/user.js";   

import Posts from './Posts';

const LikedsPosts = ({ userID }) => {

  const dispatch = useDispatch()

  const likedsPosts = useSelector((state) => state.user.likedPosts)
  const favoritedPosts = useSelector((state) => state.user.favoritedPosts);

  useEffect(() => {
    dispatch(getLikedsPosts(userID))
  }, [])


  return (
    <>
      {
        likedsPosts && (
          <Posts posts={likedsPosts} favPosts={favoritedPosts} category={LIKEDS} />
        )
      }
    </>
  )


}

export default LikedsPosts