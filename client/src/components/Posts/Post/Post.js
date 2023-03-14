import React, { useState } from "react"
import { Card, CardActions, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useDispatch } from "react-redux"
// import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { deletePost, likePost, favoritePost } from "../../../actions/posts"
import useStyles from './styles'
import memories from '../../../images/memories.png'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState( JSON.parse( localStorage.getItem('profile') ) )
    const navigate = useNavigate()
    const [likes, setLikes] = useState( post?.likes )

    const userId = user?.result?.googleId || user?.result?._id

    const hasLikedPost = likes.find( (like) => like === userId)

    const handleLike = async () => {
        dispatch( likePost(post._id))

        if (hasLikedPost) {
            setLikes( likes.filter((id) => id !== userId) )
        } else {
            setLikes( [...likes, userId] )
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find( (like) => like === userId)
                ? (
                    // SE A PESSOA CURTIU O POST, ELA VE A QUANTIDADE DE LIKES DELE E DE OUTRAS, SENAO, SE SO ELA CURTIU ENTAO MOSTRA ( '1 LIKE' OU '2 LIKES'... )
                    <>
                        <ThumbUpIcon fontSize="small" />
                        &nbsp; {likes.length > 1 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    // SE SO UMA PESSOA CURTIU ENTAO MOSTRA ( '1 LIKE' OU '2 LIKES'... )
                    <>
                        <ThumbUpAltOutlinedIcon fontSize="small" />
                        &nbsp; {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                )
        }

        // SE FOR A PRIMEIRA PESSOA A CURTIR
        return <> <ThumbUpAltOutlinedIcon fontSize="small" /> &nbsp; Like </>
    }

    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    // HANDLE FAVORITE ===================

    const handleFavorite = async () => {        
        const postId = post._id
        console.log(postId);
        dispatch( favoritePost(userId, {postId: postId}) )      
        

        // if (hasFavoritedPost) {
        //     setFavorite( favorite.filter( (id) => id !== userId) )
        // } else {
        //     setFavorite( [...favorite, userId] )
        // }
    }

    const Favorite = () => {
    
        // if ( hasFavoritedPost ) {
        //     return ( (fav) => fav === userId)
        //         ? (
        //             <>
        //                 <FavoriteIcon fontSize="small" />
        //             </>
        //         ) : (
        //             <>
        //                 <FavoriteBorderIcon fontSize="small" />
        //             </>
        //         )
        // }

        return (
            <>
                <FavoriteBorderIcon fontSize="small" />
            </>
        )

    }

    return (
        <Card className={classes.card} raised elevation={6}>
            {/* <ButtonBase className={classes.cardActions} onClick={openPost} > */}

                <CardMedia className={classes.media} src={memories} title={post.title} />

                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                </div>

                {/* SE NAO FOR A PESSOA QUE CRIOU O POST, ENTAO NAO PODERA VER O BOTAO */}
                {(user?.result?.googleId || user?.result?._id) === post?.creator && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )}
            {/* </ButtonBase> */}

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

            <Typography className={classes.title} variant="h5" gutterBottom component="h2">
                {post.title}
            </Typography>

            <CardActions className={classes.cardActions}>

                <Button className={classes.likeBtn} size="small" color="primary" disabled={!user?.result} onClick={handleFavorite}>
                    <Favorite />
                </Button>

                <Button className={classes.likeBtn} size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>

                {/* SE NAO FOR A PESSOA QUE CRIOU O POST, ENTAO NAO PODERA VER O BOTAO */}
                {(user?.result?.googleId || user?.result?._id) === post?.creator && (

                    <Button className={classes.deleteBtn} size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>

                )}

            </CardActions>
        </Card>
    )
}

export default Post;
