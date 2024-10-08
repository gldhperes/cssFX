import { createTheme } from '@mui/material/styles';

const white = "#FFF"
const grey = '#999999'
const roxo = "#650065"

const theme = createTheme({

    palette: {
        primary: {
            main: white,
            light: white,
            dark: white,
            contrastText: white,
        },

        secundary: {
            main: grey,
            light: grey,
            dark: grey,
            contrastText: grey,
        },

        buttons:
        {
            main: roxo,
            light: roxo,
            dark: roxo,
            contrastText: roxo,
        }

    },
});


export default theme ;