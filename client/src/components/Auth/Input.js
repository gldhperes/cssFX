import React from 'react'

import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import useStyles from './styles'

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
    const classes = useStyles()

    return (
        <Grid item xs={12} sm={half ? 6 : 12} >
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"

                className={`${classes.inputComponent}`}
                
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                // && = SOMENTE SE NAME = PASSWORD
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null
                } />
        </Grid>
    )

}



export default Input