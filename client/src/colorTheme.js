import { createTheme } from '@material-ui/core/styles';
const color = "#FFF"
const theme = createTheme({
    palette: {
        primary: {
            main: color,
            light: color,
            dark: color,
            contrastText: color,
        },

        secundary: {
            main: color,
            light: color,
            dark: color,
            contrastText: color,
        },
    },
});

export default theme;