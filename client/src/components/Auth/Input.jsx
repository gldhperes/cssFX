import React from 'react'

import { TextField, Grid2 } from '@mui/material'


import useStyles from './styles'

const Input = ({ name, handleChange, label, type }) => {
    const classes = useStyles()

    return (
        <Grid2 size={20}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"

                size="small"
                fullWidth
                sx={customSx}
                required
                label={label}
                
                type={type}
              
            />
        </Grid2>
    )

}

const customSx = {
    ".MuiInputLabel-root": {
        color: "purple",
    },

    ".MuiOutlinedInput-root": {
        input: {
            color: "purple",
            
        },
        fieldset: {
            border: "1px solid purple",
        },
        "&.Mui-focused label": {
            color: "purple",
            backgroundColor: "white",
        },
        "&.Mui-focused fieldset": {
            border: "1px solid purple",
        },
        '&:hover fieldset': {
            borderColor: "purple",
        },

    },
}


export default Input