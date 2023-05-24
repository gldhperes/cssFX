import React, { useEffect, useState } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
// import moment from 'moment' // biblioteca JS que lida com o tempo
import { useParams, useNavigate } from 'react-router-dom'

import { getPost, getPostsBySearch } from '../../actions/posts'
import useStyles from './styles.js'
import CodeEditors from './CodeEditors'
import { profile } from '../../constants/routes'
import { getUserProfile } from '../../actions/user'

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const [htmlCode, setHtmlCode] = useState(null)
  const [cssCode, setCssCode] = useState(null)


  const [codeExemple, setCodeExemple] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const classes = useStyles()

  function HTMLRenderer({ html }) {
    return <div id="htmlRenderer" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  function CSSRenderer({ css }) {
    useEffect(() => {
      const styleElement = document.createElement("style");
      styleElement.innerText = css;
      const htmlRenderer = document.getElementById("htmlRenderer")

      htmlRenderer.appendChild(styleElement);
      return () => {
        htmlRenderer.removeChild(styleElement);
      };
    }, [css]);

    return null;
  }

  useEffect(() => {
    if (htmlCode !== null && cssCode !== null && codeExemple === null) {
      console.log(cssCode);
      // console.log(typeof (htmlCode));
      setCodeExemple(htmlCode)
    }
  }, [htmlCode, cssCode, codeExemple]);


  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
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

        <CodeEditors post={post} />

        <Divider style={{ width: '100%', backgroundColor: 'white', margin: '20px 0' }} />

        <div id="codeExemple" className={`${classes.codeExemple} ${classes.flex}`} >


          {(codeExemple !== null && cssCode !== null) &&
            <>
              <HTMLRenderer html={codeExemple} />
              <CSSRenderer css={cssCode} />
            </>
          }
        </div>



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