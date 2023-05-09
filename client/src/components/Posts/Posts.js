import React from "react"
import { CircularProgress } from '@material-ui/core'
import { useSelector } from "react-redux";

import Post from "./Post/Post";

import { FAVORITES, MOST_LIKEDS } from "../../constants/pagesTypes";

const Posts = ({ posts, favPosts, followed, category, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'))

    const { isLoading } = useSelector((state) => state.posts)

    console.log(category);
    if (!posts && !isLoading) { return 'No Posts' }

    if (!posts) { return 'No Posts' }

    function getFavorited(postId) {
        // console.log(`favoritedPosts: ${ JSON.stringify(favoritedPosts) } `);

        if (favPosts) {
            // console.log(favPosts);

            return favPosts?.find((favPost) => (favPost._id === postId) ?
                true : false
            )
        } else {
            return false
        }
    }

    const getPosts = (cat, post) => {
        console.log(cat);
        switch (cat) {
            case FAVORITES:
                // console.log(FAVORITES);
                if (!user) return
                return (
                    <>
                        <Post
                            post={post}
                            favorited={post}
                            setCurrentId={setCurrentId}
                            followed={followed}
                        />
                    </>
                )
            case MOST_LIKEDS:
                // console.log(MOST_LIKEDS);
                return (
                    <>
                        <Post
                            post={post}
                            favorited={getFavorited(post._id)}
                            setCurrentId={setCurrentId}
                            followed={followed}
                        />
                    </>
                )

            default:
                return (
                    <>
                        {"NO POSTS"}
                    </>
                )
        }
    }


    return (


        isLoading ? <CircularProgress /> : (
            <>
                {
                    (posts) ? (

                        posts.map((post) => (
                            // getPost(post._id),

                            <div key={post._id}>
                                {getPosts(category, post)}
                            </div>
                        ))
                    ) : (
                        "No posts"
                    )
                }
            </>
        )
    )
}

export default Posts;