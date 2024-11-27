import React, { useState, useEffect } from "react"
import { TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { updatePost } from '../../actions/posts.js'


import useStyles from './styles.js';

import CodeEditorPanels from "./CodeEditorPanels.jsx";

import OnSubmitCodeMessage from "./OnSubmitCodeMessage.jsx";
import CodeViewer from "./CodeViewer.jsx";
import { recentPosts } from "../../constants/routes.js";
// import CodeEditorForm from "./CodeEditorForm";

const UpdateUserPost = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const [htmlCode, setHtmlCode] = useState(null)
    const [cssCode, setCssCode] = useState(null)
    
    const { id } = useParams()
    
    const [submited, setSubmited] = useState(false)
    
    const [currentId, setCurrentId] = useState('')
    
    const [postData, setPostData] = useState(post)
    
    const clear_postData = () => {
        // setCurrentId(null);


        setPostData({
            title: '', htmlCode: '',
            cssCode: '', backendCode: '',
            codeImg: '', tags: ''
        });

        console.log(`CLEARED POST DATA: ${postData}`);
    };

    const handleUpdatePostData = (updated_post) => {
        setPostData(updated_post)
    }


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

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmited(true)
        dispatch(updatePost(id, postData))
        clear_postData()
        navigate("/")
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own post and like other's posts.
                </Typography>
            </Paper>
        )
    }

    // console.log(post);

    return (

        <Paper className={`${classes.flex} ${classes.paper}`} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.flex} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Update a Post</Typography>

                {/* TITULO DO POST */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={post?.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                {/* <TextField name="tag" variant="outlined" label="Tag" fullWidth value={postData?.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} /> */}

                <CodeEditorPanels
                    postData={(post) && post}
                    setPostData={handleUpdatePostData}
                    can_edit={true}
                />

                <CodeViewer htmlCode={post?.htmlCode} cssCode={post?.cssCode} />

                {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, codeImg: base64 })} /> */}

                <Button
                    className={classes.submitBtn}
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Update
                </Button>

                <Button
                    className={classes.clearBtn}
                    variant="contained"
                    size="small"
                    onClick={clear_postData}
                    fullWidth
                >
                    Clear
                </Button>


            </form>

            {
                (submited) && (
                    <>
                        <OnSubmitCodeMessage postData={postData} clear={clear_postData} currentId={currentId} setSubmited={setSubmited} />
                    </>
                )
            }
        </Paper>
    )
}

export default UpdateUserPost;
