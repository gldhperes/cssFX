import React, { useState, useEffect } from "react"
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
// import CodeEditorForm from "./CodeEditorForm";

const Form = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState('')

    const post = useSelector( (state) => state.posts.post )

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
        if(post) {
            console.log(`UPDATE POST: ${post}`);
            setPostData(post); 
            setCurrentId(post._id)
        }
        
    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`currentId: ${currentId}`);

        if(currentId === null){
            dispatch ( createPost ({ ...postData, name: user?.result?.name}) )
            
        }else{
            dispatch( updatePost (currentId,{ ...postData, name: user?.result?.name}) )    
        }

        navigate('/')
        clear()
    }

    if(!user?.result?.name){
        return(
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
                <Typography variant="h6">{ currentId ? 'Editing' :'Creating'} a Post</Typography>

                {/* TITULO DO POST */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="tag" variant="outlined" label="Tag" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                {/* HTML CODE */}
                {/* <CodeEditorForm postData={postData} setPostData={setPostData}/> */}

                <TextField name="html" variant="outlined" label="Html" fullWidth value={postData.htmlCode} onChange={(e) => setPostData({ ...postData, htmlCode: e.target.value })} />
                <TextField name="css" variant="outlined" label="Css" fullWidth value={postData.cssCode} onChange={(e) => setPostData({ ...postData, cssCode: e.target.value })} />
                <TextField name="Backend" variant="outlined" label="Backend" fullWidth value={postData.backendCode} onChange={(e) => setPostData({ ...postData, backendCode: e.target.value })} />
                
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, codeImg: base64 })} />

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{ currentId ? 'Edit' :'Create'}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;