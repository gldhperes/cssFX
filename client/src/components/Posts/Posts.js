import React from "react"
import { CircularProgress } from '@mui/material'
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import useStyle from './styles'
import { FAVORITES, POSTS, LIKEDS } from "../../constants/pagesTypes";

const Posts = ({ posts, favPosts, followed, category, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyle()
    const { isLoading } = useSelector((state) => state.posts)

    // console.log(category);
    if (!posts && !isLoading) { return 'No Posts' }

    if (!posts) { return 'No Posts' }

    posts.forEach(element => {
        console.log(`posts element ${element._id}`);
    });

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
        // console.log(cat);
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
            case POSTS:
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

            case LIKEDS:
                // console.log(MOST_LIKEDS);
                return (
                    <>
                        <Post
                            post={post}
                            favorited={getFavorited(post?._id)}  
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
            <div className={`${classes.flex} ${classes.postsContainer}`} >
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
            </div>
        )
    )
}

export default Posts;