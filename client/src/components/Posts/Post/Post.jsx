import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { Card, CardActions, Button, Typography, IconButton, Avatar, ThemeProvider } from '@mui/material'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import theme from "../../../colorTheme.js"


// import { FAVORITES, MOST_LIKEDS, USER_POSTS } from "../../../constants/pagesTypes";
// import red from "@mui/material/colors/red";
// import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { likePost, favoritePost, getPost } from "../../../actions/posts"
import { getUserProfile } from "../../../actions/user"
import { recentPosts, profile } from "../../../constants/routes";

import useStyles from './styles'
import EditPostMenu from "./EditPostMenu";
import theme from "../../../theme.js";
import OnPostCodeViewer from "../../CodeViewer/OnPostCodeViewer.jsx";

const Post = ({ post, favorited }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [user] = useState(JSON.parse(localStorage.getItem('profile')))

    const [likes, setLikes] = useState(post?.likes)
    const [favorite, setFavorite] = useState(favorited)
    // const [follow, setFollow] = useState(useSelector((state) => state.user.following))

    const userId = user?.result?.googleId || user?.result?._id
    const postId = post?._id
    const postCreator = post?.creator

    // const [following, setFollowing] = useState(follow?.find((element) => element.id === postCreator) ? true : false)

    const hasLikedPost = likes.find((like) => like === userId)

    const base64creatorImg = 'data:image/png;base64,' + post?.creatorImg // Substitua com sua string Base64
    const base64codeImg = post?.codeImg // Substitua com sua string Base64

    // UserPage ================================
    const callUserPage = async (user_id) => {
        // console.log(user_id);
        dispatch(getUserProfile(user_id))
        navigate(profile)
    }



    // HANDLE FAVORITE ===================
    const handleFavorite = async (e) => {

        setFavorite(!favorite)

        dispatch(favoritePost(userId, { postId: postId }))
    }

    const Favorite = () => {

        return (favorite) ?
            (
                <>
                    <FavoriteIcon fontSize="small" />
                </>
            ) : (
                <>
                    <FavoriteBorderIcon fontSize="small" />
                </>

            )
    }




    // HANDLE LIKES =========================
    const handleLike = async (e) => {
        // e.preventDefault()

        dispatch(likePost(post._id))

        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId))
        } else {
            setLikes([...likes, userId])
        }
    }

    const Likes = () => {

        if (likes.length > 0) {

            return likes.find((like) => like === userId)
                ? (
                    // SE A PESSOA CURTIU O POST, ELA VE A QUANTIDADE DE LIKES DELE E DE OUTRAS, SENAO, SE SO ELA CURTIU ENTAO MOSTRA ( '1 LIKE' OU '2 LIKES'... )
                    <>
                        <ThumbUpIcon fontSize="small" />

                        <Typography variant="body2" component="h2">
                            &nbsp;{likes?.length} {likes?.length === 1 ? 'Like' : 'Likes'}
                        </Typography>
                    </>
                ) : (
                    // SE SO UMA PESSOA CURTIU ENTAO MOSTRA ( '1 LIKE' OU '2 LIKES'... )
                    <>
                        <ThumbUpAltOutlinedIcon fontSize="small" />

                        <Typography variant="body2" component="h2">
                            &nbsp;{likes?.length} {likes?.length === 1 ? 'Like' : 'Likes'}
                        </Typography>
                    </>
                )
        }

        // SE FOR A PRIMEIRA PESSOA A CURTIR
        return (
            <>
                <ThumbUpAltOutlinedIcon fontSize="small" />

                <Typography variant="body2" component="h2">
                    &nbsp; {"Like"}
                </Typography>
            </>
        )
    }



    // HANDLE FOLLOW ===============================
    // const handleFollow = async (e) => {

    //     setFollowing(!following)
    //     dispatch(followUser(userId, postCreator))

    // }

    // const Follow = () => {

    //     return (following)
    //         ? (
    //             <>
    //                 <PersonAddAlt1Icon fontSize="small" />

    //                 <Typography variant="body2" component="h2">
    //                     &nbsp;{"Following"}
    //                 </Typography>
    //             </>
    //         ) : (
    //             <>
    //                 <PersonAddAltIcon fontSize="small" />

    //                 <Typography variant="body2" component="h2">
    //                     &nbsp;{"Follow"}
    //                 </Typography>
    //             </>
    //         )
    // }


    // FUNCTIONS =============================

    const openPostDetails = () => {
        dispatch(getPost(post?._id))
        navigate(`${recentPosts}/${post?._id}`)
    }

    // console.log(post);

    return (
        <Card className={`${classes.post} ${classes.flex}`} elevation={6} >
            <div className={`${classes.flex} ${classes.postImg}`} >

                {/* <Button className={`${classes.buttonOverride} ${classes.flex}`} onClick={() => openPostDetails()} /> */}

                <OnPostCodeViewer htmlCode={post?.htmlCode} cssCode={post?.cssCode} openPostDetails={openPostDetails} />

            </div>

            <div className={`${classes.postDetails} ${classes.flex}`}>

                <div className={`${classes.tags} ${classes.flex}`}>
                    <Typography variant="body2" component="h2">
                        {
                            post?.tags?.map((tag) => `#${tag} `)
                        }
                    </Typography>
                </div>

                <div className={`${classes.postInfo} ${classes.flex}`}>

                    <Avatar className={`${classes.flex} ${classes.postCreatorIcon}`} src={base64creatorImg} onClick={() => callUserPage(postCreator)} />

                    <div className={`${classes.postContent} ${classes.flex}`}>
                        <Typography variant="h6"> {post?.title} </Typography>

                        <Typography className={classes.postCreator} variant="h6" onClick={() => callUserPage(postCreator)}> {post.name} </Typography>
                    </div>


                </div>

            </div>

            <CardActions className={`${classes.postActions} ${classes.flex}`}>

                <IconButton size="small" disabled={!user?.result} style={{ color: "white" }} onClick={handleFavorite}>
                    <Favorite />
                </IconButton>

                <IconButton style={{ color: "white" }} size="small" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </IconButton>

                {/* SE NAO FOR A PESSOA QUE CRIOU O POST, ENTAO NAO PODERA VER O BOTAO */}
                {(user?.result?.googleId || user?.result?._id) === post?.creator && (
                    <EditPostMenu id={postId} />
                )}



            </CardActions>
        </Card>
    )
}

export default Post;
