import React, { useState, useEffect } from "react"
import { TextField, Button, Typography, Paper } from '@material-ui/core';
// import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ( {currentId, setCurrentId} ) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()

    const [postData, setPostData] = useState({
        title: '', htmlCode: '',
        cssCode: '', backendCode: '', tags: ''
    })
    
    const post = useSelector( (state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(post) setPostData(post); 
    }, [post])

    const clear = () => {
        setCurrentId(null);

        setPostData({ 
            title: '', htmlCode: '',
            cssCode: '', backendCode: '', tags: '' 
        });
    };

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
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className="form" onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' :'Creating'} a Post</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="html" variant="outlined" label="Html" fullWidth value={postData.htmlCode} onChange={(e) => setPostData({ ...postData, htmlCode: e.target.value })} />
                <TextField name="css" variant="outlined" label="Css" fullWidth value={postData.cssCode} onChange={(e) => setPostData({ ...postData, cssCode: e.target.value })} />
                <TextField name="tag" variant="outlined" label="Tag" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;