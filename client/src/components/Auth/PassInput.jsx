import React, { useState } from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { width } from '@mui/system'
import { purple } from '@mui/material/colors'

const PassInput = ({ inputLabel }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <FormControl sx={customSx} variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password"> {inputLabel} </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end" >
                        <IconButton sx={{ color: "purple" }}
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            // onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
        </FormControl>
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

export default PassInput