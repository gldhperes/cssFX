import React, { useState, useEffect } from "react"
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getPost } from '../../actions/posts.js'

// import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles.js';

import CodeEditorPanels from "./CodeEditorPanels.jsx";
// import checkCode from "./checkCode"
import OnSubmitCodeMessage from "./OnSubmitCodeMessage.jsx";
import CodeViewer from "./CodeViewer.jsx";
// import CodeEditorForm from "./CodeEditorForm";

const UpdateUserPost = () => {

    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()

    const { post } = useSelector((state) => state.posts)

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
    };

    const handleUpdatePostData = (updated_post) => {
        setPostData(updated_post)
    }

    useEffect(() => {
        dispatch(getPost(id))
    }, [id, dispatch])

    useEffect(() => {
        // clear()

        if (post) {
            console.log(`UPDATE POST: ${post}`);
            setPostData(post);
            setCurrentId(post._id)
        }

    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmited(true)
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

    return (
        console.log(postData),

        <Paper className={`${classes.flex} ${classes.paper}`} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.flex} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Update a Post</Typography>

                {/* TITULO DO POST */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="tag" variant="outlined" label="Tag" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <CodeEditorPanels
                    postData={postData}
                    setPostData={handleUpdatePostData}
                    can_edit={true}
                />

                <CodeViewer htmlCode={postData?.htmlCode} cssCode={postData?.cssCode} />

                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, codeImg: base64 })} />

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
