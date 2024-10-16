import { createTheme } from '@mui/material/styles';

const white = "#FFF"
const grey = '#999999'
const purple = "#650065"
const darkPurple = "#400040"
const darkerPurple = '#1E001E'

const theme = createTheme({

    palette: {
        primary: {
            main: white,
            light: white,
            dark: white,
            // contrastText: white,
        },

        secundary: {
            main: grey,
            light: grey,
            dark: grey,
            // contrastText: grey,
        },

        buttons:
        {
            main: purple,
            dark: darkPurple,
            darker: darkerPurple,
            contrastText: white,
        }

    },
});


export default theme ;