import React from 'react'
import { useSelector } from "react-redux"

import { LIKEDS } from "../../constants/pagesTypes";
import Posts from './Posts';

const LikedsPosts = () => {
  const likedsPosts = useSelector((state) => state.user.likedPosts)
  const favoritedPosts = useSelector((state) => state.user.favoritedPosts);

  console.log(`likedsPosts ${likedsPosts}`);

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