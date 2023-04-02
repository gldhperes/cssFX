import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardActions, CardMedia, Button, Typography, IconButton } from '@material-ui/core'

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import DeleteIcon from '@material-ui/icons/Delete'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// import { FAVORITES, MOST_LIKEDS, USER_POSTS } from "../../../constants/pagesTypes";
// import red from "@material-ui/core/colors/red";
// import moment from 'moment'
// import { useNavigate } from 'react-router-dom'
import { deletePost, likePost, favoritePost } from "../../../actions/posts"
import { followUser } from "../../../actions/user"

import memories from '../../../images/memories.png'

import useStyles from './styles'

const Post = ({ post, favorited, followed }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const [user] = useState(JSON.parse(localStorage.getItem('profile')))

    const [likes, setLikes] = useState(post?.likes)
    const [favorite, setFavorite] = useState(favorited)
    const [follow, setFollow] = useState(useSelector((state) => state.user.following))

    const userId = user?.result?.googleId || user?.result?._id
    const postId = post?._id
    const postCreator = post?.creator

    const hasLikedPost = likes?.find((like) => like === userId)


    // HANDLE LIKES =========================

    const handleLike = async () => {
        dispatch(likePost(post._id))

        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId))
        } else {
            setLikes([...likes, userId])
        }
    }

    const Likes = () => {
        if (likes?.length > 0) {
            return likes?.find((like) => like === userId)
                ? (
                    // SE A PESSOA CURTIU O POST, ELA VE A QUANTIDADE DE LIKES DELE E DE OUTRAS, SENAO, SE SO ELA CURTIU ENTAO MOSTRA ( '1 LIKE' OU '2 LIKES'... )
                    <>
                        <ThumbUpIcon fontSize="small" />

                        {/* &nbsp; {likes?.length > 1 ? `You and ${likes?.length - 1} others` : `${likes?.length} like${likes?.length > 1 ? 's' : ''}`} */}

                        <Typography variant="body2" component="h2">
                            &nbsp;{likes?.length} {likes?.length === 1 ? 'Like' : 'Likes'}
                        </Typography>
                    </>
                ) : (
                    // SE SO UMA PESSOA CURTIU ENTAO MOSTRA ( '1 LIKE' OU '2 LIKES'... )
                    <>
                        <ThumbUpAltOutlinedIcon fontSize="small" />
                        {/* &nbsp; {likes?.length} {likes?.length === 1 ? 'Like' : 'Likes'} */}

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




    // HANDLE FAVORITE ===================

    const handleFavorite = async () => {
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

    // HANDLE FOLLOW ===============================

    const handleFollow = async () => {

        setFollow(!follow)
        dispatch(followUser(userId, postCreator))
    }

    const Follow = () => {
        let _follow = false

        return (follow) ?
            (
                <>
                    <CheckCircleRoundedIcon fontSize="small" />

                    <Typography variant="body2" component="h2">
                        &nbsp;{"Following"}
                    </Typography>
                </>
            ) : (
                <>
                    <CheckCircleOutlineRoundedIcon fontSize="small" />

                    <Typography variant="body2" component="h2">
                        &nbsp;{"Follow"}
                    </Typography>
                </>
            )
    }


    // FUNCTIONS =============================

    // const openPost = () => {
    //     navigate(`/posts/${post._id}`)
    // }

    // CALL AUTHOR PAGE


    return (
        <Card className={`${classes.post} ${classes.flex}`} raised elevation={6}>


            <CardMedia className={classes.media} src={memories} title={post.title} />

            <div className={`${classes.postDetails} ${classes.flex}`}>

                <div className={`${classes.tags} ${classes.flex}`}>
                    <Typography variant="body2" component="h2">
                        {post?.tags?.map((tag) => `#${tag} `)}
                    </Typography>
                </div>

                <div className={`${classes.postInfo} ${classes.flex}`}>

                    <div className={classes.postCreatorIcon}></div>

                    <div className={`${classes.postContent} ${classes.flex}`}>
                        <Typography variant="h6"> {post?.title} </Typography>

                        <Typography className={classes.postCreator} variant="h6" onClick={() => console.log("CALL AUTHOR PAGE")}> {post.name} </Typography>
                    </div>


                </div>

            </div>

            {/* SE NAO FOR A PESSOA QUE CRIOU O POST, ENTAO NAO PODERA VER O BOTAO */}
            {/* {(user?.result?.googleId || user?.result?._id) === post?.creator && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )} */}





            <CardActions className={`${classes.postActions} ${classes.flex}`}>

                <IconButton size="small" disabled={!user?.result} style={{ color: "white" }} onClick={handleFavorite}>
                    <Favorite />
                </IconButton>

                <IconButton style={{ color: "white" }} size="small" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </IconButton>

                <IconButton style={{ color: "white" }} size="small" disabled={!user?.result} onClick={handleFollow}>
                    <Follow />
                </IconButton>

                {/* SE NAO FOR A PESSOA QUE CRIOU O POST, ENTAO NAO PODERA VER O BOTAO */}
                {(user?.result?.googleId || user?.result?._id) === post?.creator && (

                    <Button className={classes.deleteBtn} size="small" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon style={{ color: "white" }} fontSize='small' />
                    </Button>

                )}



            </CardActions>
        </Card>
    )
}

export default Post;
