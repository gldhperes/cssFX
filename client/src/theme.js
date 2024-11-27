import { createTheme } from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';

const white = "#FFF"
const grey = '#999999'
const purple = "#650065"
const darkPurple = "#400040"
const darkerPurple = '#1E001E'

const theme = createTheme({

    palette: {
        primary: {
            main: darkPurple,
            light: purple,
            dark: darkerPurple,
            contrastText: white,
        },

        secundary: {
            main: darkerPurple,
            light: white,
            dark: white,
            contrastText: darkPurple,
        },

    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    color: white,
                    backgroundColor: purple,
                },
            },
        },
    },
});


export default theme;