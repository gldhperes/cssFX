import { createTheme } from '@material-ui/core/styles';

const white = "#FFF"
const grey = '#999999'


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


    },
});

export default theme;