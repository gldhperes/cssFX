import React, { useEffect, useState } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
// import moment from 'moment' // biblioteca JS que lida com o tempo
import { useParams, useNavigate } from 'react-router-dom'

import { getPost } from '../../actions/posts'
import useStyles from './styles.js'

import { profile } from '../../constants/routes'
import { getUserProfile } from '../../actions/user'
import CodeEditorPanels from '../CodeViewer/CodeEditorPanels.jsx'
import CodeViewer from '../CodeViewer/CodeViewer.jsx'

const PostDetails = () => {

  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  const [htmlCode, setHtmlCode] = useState(null)
  const [cssCode, setCssCode] = useState(null)


  // const [codeExemple, setCodeExemple] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  const classes = useStyles()


  useEffect(() => {
    if (htmlCode !== null && cssCode !== null) {
      console.log(htmlCode);
      console.log(cssCode);
      // console.log(typeof (htmlCode));
      setHtmlCode(htmlCode)
      setHtmlCode(cssCode)
    }
  }, [htmlCode, cssCode]);


  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      // dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
      setHtmlCode(post?.htmlCode)
      setCssCode(post?.cssCode)
    }
  }, [post, dispatch, htmlCode, cssCode])

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
    dispatch(getPost(_id))
    navigate(`/posts/${_id}`)
  }

  function callAuthorPage(creatorId) {
    dispatch(getUserProfile(creatorId))
    navigate(profile)
  }

  return (
    <Paper style={{ color: 'white', backgroundColor: '#470047', padding: '20px' }} elevation={6}>
      <div className={`${classes.card} ${classes.flex}`}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" component="h2">{post.tags.map((tag) => `#${tag}, `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography style={{ width: 'auto', cursor: 'pointer' }} variant="h6" component="h2" onClick={() => callAuthorPage(post?.creator)}>Created by: {post.name}</Typography>

          {/* COLOCAR BOTOES DE FOLLOW, LIKE, FAVORITE */}
        </div>

        <Divider style={{ width: '100%', backgroundColor: 'white', margin: '20px 0' }} />

        <CodeEditorPanels postData={post} can_edit={false} />

        <Divider style={{ width: '100%', backgroundColor: 'white', margin: '20px 0' }} />

        <CodeViewer htmlCode={htmlCode} cssCode={cssCode} />

        {/* <div id="codeExemple" className={`${classes.codeExemple} ${classes.flex}`} >

          {(htmlCode !== null && cssCode !== null) &&
            <>
              <HTMLRenderer html={htmlCode} />
              <CSSRenderer css={cssCode} />
            </>
          }
        </div> */}



      </div>

      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'> You might also like:</Typography>

          <Divider style={{ backgroundColor: 'white', margin: '20px 0' }} />

          <div className={`${classes.recommendedPosts} ${classes.flex}`}>
            {recommendedPosts.map(({ title, message, name, likes, _id }) => (
              // KEY serve para
              <div className={`${classes.recommendedPostsCard} ${classes.flex}`} onClick={() => openPost(_id)} key={_id}>
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