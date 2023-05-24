import React from 'react'
import { useSelector } from "react-redux"

import { LIKEDS } from "../../constants/pagesTypes";
import Posts from './Posts';

const LikedsPosts = () => {
  const likedsPosts = useSelector((state) => state.user.likedPosts)

  console.log(likedsPosts);

  return (
    <>
      {
        likedsPosts && (
          <Posts posts={likedsPosts} category={LIKEDS} />
        )
      }
    </>
  )


}

export default LikedsPosts