import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';

import Icon from './Icon.js'
import Input from './Input.js'
import { signin, signup, googleSignIn } from '../src/functions/actions/auth.js'

import useStyles from './styles.js'
const initalState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initalState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '132306028558-ip1jv3f6pj03amoj0fj0qg4fnivi8r2u.apps.googleusercontent.com',
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

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
        const result = res?.profileObj;
        // console.log(res);

        try {

            dispatch(googleSignIn(result))

            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
    }

    return (
        <Container component='main' maxWidth="xs">
            <Paper className={`${classes.flex} ${classes.paper}`} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5">
                    {
                        (isSignup) ? (
                            'Sign Up'
                        ) : (
                            'Sign In'
                        )
                    }
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            // && = SOMENTE SE ESTIVER LOGADO
                            (isSignup) && (
                                <>
                                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }

                        <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
                        <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {
                            (isSignup) && (
                                <>
                                    <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type="password" />
                                </>
                            )
                        }
                    </Grid>

                    <Button  className={`${classes.loginButton} ${classes.submit}`} type='submit' fullWidth variant='contained'>
                        {
                            (isSignup) ? (
                                'Sign Up'
                            ) : (
                                'Sign In'
                            )
                        }
                    </Button>

                    <GoogleLogin

                        clientId='132306028558-ip1jv3f6pj03amoj0fj0qg4fnivi8r2u.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                className={`${classes.loginButton} ${classes.googleButton}`}
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained' >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button className={`${classes.loginButton}`} onClick={switchMode}>
                                {
                                    (isSignup) ? (
                                        'Already have an account? Sign In'
                                    ) : (
                                        "Don't have an account? Sign Up"
                                    )
                                }
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth