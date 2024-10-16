import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Code_Viewer from './Code_Viewer';
import FileBase from 'react-file-base64'

import { TextField, Button, Typography, Paper } from '@mui/material';

import useStyles from './styles.js'

import Code_Editor_Panels from './Code_Editor_Panels';
import OnSubmitCodeMessage from './OnSubmitCodeMessage.jsx';
import { createPost } from '../../actions/posts.js';


const Create_Post = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    
    const user = JSON.parse(localStorage.getItem('profile'))

    const [submited, setSubmited] = useState(false)

    const [currentId, setCurrentId] = useState('')

    const [postData, setPostData] = useState({
        title: '', htmlCode: '',
        cssCode: '', backendCode: '',
        codeImg: '', tags: ''
    })


    const clear_postData = () => {

        setPostData({
            title: '', htmlCode: '',
            cssCode: '', backendCode: '',
            codeImg: '', tags: ''
        });
    };


    const handleUpdatePostData = (updated_post) => {
        setPostData(updated_post)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmited(true)
        dispatch(createPost(postData))
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
        <Paper className={`${classes.flex} ${classes.paper}`} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.flex} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{'Creating'} a Post</Typography>

                {/* TITULO DO POST */}
                <TextField name="title" variant="outlined" label="Title" fullWidth required value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="tag" variant="outlined" label="Tag" fullWidth required value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <Code_Editor_Panels
                    postData={postData}
                    setPostData={handleUpdatePostData}
                    can_edit={true}
                />

                <Code_Viewer htmlCode={postData?.htmlCode} cssCode={postData?.cssCode} />


                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, codeImg: base64 })} />

                <Button
                    className={classes.submitBtn}
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Create
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

export default Create_Post