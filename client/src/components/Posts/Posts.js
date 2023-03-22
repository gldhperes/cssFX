import React from "react"
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from "react-redux";

import Post from "./Post/Post";

import useStyles from './styles';
import { FAVORITES, MOST_LIKEDS } from "../../constants/pagesTypes";

const Posts = ({ posts, favPosts, category, setCurrentId }) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))

    const { isLoading } = useSelector((state) => state.posts)


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

    function getPosts(post) {
        switch (category) {
            case FAVORITES:
                // console.log(FAVORITES);
                return (
                    <>
                        <Post
                            post={post}
                            favorited={post}
                            setCurrentId={setCurrentId}
                        />
                    </>
                )
            case MOST_LIKEDS:
                // console.log(MOST_LIKEDS);
                return (
                    <>
                        <Post
                            post={post}
                            favorited={ getFavorited(post._id) }
                            setCurrentId={setCurrentId}
                        />
                    </>
                )

            default: return "NO POSTS"
        }
    }


    return (
        // <Grid item xs={12} sm={6} md={9}>
        //     <Grid className={classes.container} container alignItems="stretch" spacing={3}>

        //     </Grid>
        // </Grid>

        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    (posts && user) ? (

                        posts.map((post) => (
                            // getPost(post._id),

                            <Grid key={post?._id} item xs={12} sm={6} md={6} lg={3}>
                                {getPosts(post)}
                            </Grid>
                        ))
                    ) : (
                        "No posts"
                    )
                }
            </Grid>
        )
        // isFavoriteRoute ? (
        //     <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        //         {
        //             favoritedPosts.map((post) => (
        //                 console.log(`post: ${post._id}`),
        //                 <Grid key={post} item xs={12} sm={6} md={6} lg={3}>
        //                     <Post post={post} setCurrentId={setCurrentId}/>
        //                 </Grid>
        //             ))
        //         }
        //     </Grid>

        // ) : (
        //     isLoading ? <CircularProgress /> : (
        //         <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        //             {
        //                 posts.map((post) => (
        //                     <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
        //                         <Post post={post} setCurrentId={setCurrentId}/>
        //                     </Grid>
        //                 ))
        //             }
        //         </Grid>
        //     )
        // )
    )
}

export default Posts;