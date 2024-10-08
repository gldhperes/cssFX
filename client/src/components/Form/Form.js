import React, { useState, useEffect } from "react"
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

import CodeEditorForm from "./CodeEditorForm";
import checkCode from "./checkCode"
import OnSubmitCodeMessage from "./OnSubmitCodeMessage";
// import CodeEditorForm from "./CodeEditorForm";

const Form = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [submited, setSubmited] = useState(false)

    const [currentId, setCurrentId] = useState('')

    const post = useSelector((state) => state.posts.post)

    console.log(post);

    const [postData, setPostData] = useState({
        title: '', htmlCode: '',
        cssCode: '', backendCode: '',
        codeImg: '', tags: ''
    })


    const clear = () => {
        setCurrentId(null);

        setPostData({
            title: '', htmlCode: '',
            cssCode: '', backendCode: '',
            codeImg: '', tags: ''
        });
    };

    useEffect(() => {
        clear()

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
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>

                {/* TITULO DO POST */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="tag" variant="outlined" label="Tag" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                {/* HTML CODE */}
                {
                    (post) ? (
                        <CodeEditorForm
                            post={{
                                htmlCode: post.htmlCode,
                                cssCode: post.cssCode,
                                backendCode: post.backendCode
                            }}
                            postData={postData}
                            setPostData={setPostData}
                        />
                    ) : (
                        <CodeEditorForm
                            postData={postData}
                            setPostData={setPostData}
                        />
                    )
                }


                {/* SE CodeEditorForm estiver ativo entao comente os tres TextFields abaixo */}
                {/* <TextField name="html" variant="outlined" label="Html" fullWidth value={postData.htmlCode} onChange={(e) => setPostData({ ...postData, htmlCode: e.target.value })} />
                <TextField name="css" variant="outlined" label="Css" fullWidth value={postData.cssCode} onChange={(e) => setPostData({ ...postData, cssCode: e.target.value })} />
                <TextField name="Backend" variant="outlined" label="Backend" fullWidth value={postData.backendCode} onChange={(e) => setPostData({ ...postData, backendCode: e.target.value })} /> */}

                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, codeImg: base64 })} />

                <Button
                    className={classes.submitBtn}
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth>{currentId ? 'Edit' : 'Create'}
                </Button>

                <Button
                    className={classes.clearBtn}
                    variant="contained"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>


            </form>

            {
                (submited) && (
                    <>
                        <OnSubmitCodeMessage postData={postData} clear={clear} currentId={currentId} setSubmited={setSubmited} />
                    </>
                )
            }
        </Paper>
    )
}

export default Form;
