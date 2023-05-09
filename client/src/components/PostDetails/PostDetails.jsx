import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
// import moment from 'moment' // biblioteca JS que lida com o tempo
import { useParams, useNavigate } from 'react-router-dom'

import { getPost, getPostsBySearch } from '../../actions/posts'
import useStyles from './styles.js'
import CodeEditors from './CodeEditors'

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const classes = useStyles()
  const htmlCode = post?.htmlCode

  // console.log(typeof(htmlCode));

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post, dispatch])

  if (!post) return null

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }

  // O post visto nao pode ser ele mesmo
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  const openPost = (_id) => {
    navigate(`/posts/${_id}`)
  }

  function codeExemple() {
    const elemento = document.getElementById("codeExemplo");
    console.log(elemento);
    elemento.appendChild(htmlCode);

  }

  return (

    <Paper style={{ padding: '20px' }} elevation={6}>
      <div className={`${classes.card} ${classes.flex}`}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>

          <Divider style={{ margin: '20px 0' }} />
        </div>

        <CodeEditors post={post} />

        <div id="codeExemplo" className={classes.imageSection}>
          <Divider style={{ margin: '20px 0' }} />
          {/* <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} /> */}
          {/* {htmlCode } */}

        </div>

       
      </div>

      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'> You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, message, name, likes, _id }) => (
              // KEY serve para
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6"> {title} </Typography>
                <Typography gutterBottom variant="subtitle2"> {name} </Typography>
                <Typography gutterBottom variant="subtitle2"> {message} </Typography>
                <Typography gutterBottom variant="subtitle1"> Likes: {likes.length} </Typography>
                {/* IMAGEM */}
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>


  )
}

export default PostDetails