import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Avatar, Button, Paper, Typography, Container, Grid2 } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { GoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from 'react-google-login';

import { useNavigate } from 'react-router-dom';

import Icon from './Icon.js'
import Input from './Input.jsx'
import { signin, signup, googleSignIn } from "../../actions/auth.js"

import useStyles from './styles.js'
import { gapi } from 'gapi-script';
import PassInput from './PassInput.jsx';

const initalState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initalState)

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }



    // SUBMITS ==================================================================
    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignup) {
            dispatch(signup(formData))
            navigate('/')
        } else {
            dispatch(signin(formData))
            navigate('/')
        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        // console.log(res);
        // const result = res?.tokenId;
        // console.log(result);

        try {

            dispatch(googleSignIn(res))

            navigate('/')

        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
    }

    return (
        <Container maxWidth="xs">
            <Paper className={`${classes.flex} ${classes.paper}`} elevation={3}>

                <Avatar className={classes.avatar} sx={{ color: "purple" }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography color='primary.light' variant="h5">
                    {
                        (isSignup) ? (
                            'Sign Up'
                        ) : (
                            'Log In'
                        )
                    }
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid2 container spacing={2}>
                        <Grid2 container spacing={2}>
                            {
                                // && = SOMENTE SE ESTIVER LOGADO
                                (isSignup) && (
                                    <>
                                        <Input name='firstName' label="First Name" handleChange={handleChange} />
                                        <Input name='lastName' label="Last Name" handleChange={handleChange} />
                                    </>
                                )
                            }

                            <Input name='email' label="Email Address" handleChange={handleChange} type="email" />

                            <PassInput inputLabel="Password" />

                            {
                                (isSignup) && (
                                    <>
                                        <PassInput inputLabel="Repeat Password" />
                                    </>
                                )
                            }
                        </Grid2>

                        <Grid2 container spacing={2} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Button className={`${classes.loginButton} ${classes.submit}`} type='submit' fullWidth variant='contained'>
                                {
                                    (isSignup) ? (
                                        'Sign Up'
                                    ) : (
                                        'Log In'
                                    )
                                }
                            </Button>

                            <GoogleLogin

                                size='large'
                                width="364px"
                                shape={"rectangular"}
                                text='Sign In'
                                logo_alignment='left'
                                useOneTap

                                onSuccess={googleSuccess}
                                // onFailure={googleFailure}
                                onError={googleFailure}
                                cookiePolicy={'single_host_origin'}

                            />


                        </Grid2>


                        <Grid2
                            container
                            direction="row"
                            sx={{
                                width: "100%",
                                justifyContent: "flex-end",
                                alignItems: "center",

                            }}
                        >


                            <Button className={`${classes.loginButton}`} onClick={switchMode} >
                                {
                                    (isSignup) ? (
                                        'Already have an account? Sign In'
                                    ) : (
                                        "Don't have an account? Sign Up"
                                    )
                                }
                            </Button>


                        </Grid2>
                    </Grid2>
                </form>

            </Paper>
        </Container >
    )
}

export default Auth